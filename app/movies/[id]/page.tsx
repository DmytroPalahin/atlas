
"use client";

import { useMovieDetail } from "@/hooks/useMovieDetail";
import { ChevronLeftIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import About from "@/components/movies/AboutSection";
import MovieCast from "@/components/movies/MovieCast";
import MovieFooter from "@/components/movies/MovieFooter";
import MovieImages from "@/components/movies/MovieImages";
import Recommendations from "@/components/movies/Recommendations";
import TrailerPlayer from "@/components/movies/TrailerPlayer";

const MovieDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();
  const session = useSession() as unknown as { data: { imdbKey: string } };
  const imdbKey = session.data?.imdbKey;
  const {
    movie,
    credits,
    images,
    relatedMovies,
    certification,
    isloading,
    error,
    trailerLink
  } = useMovieDetail(id, imdbKey);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowTrailer(true);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [trailerLink]);

  if (isloading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 dark:border-white border-black"></div>
      </div>
    );
  } else {

    if (error || !movie) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-red-500">{error}</p>
        </div>
      );
    }

    return (
      <div className="relative">

        <TrailerPlayer
          movie={movie}
          images={images}
          showTrailer={showTrailer}
          certification={certification}
          trailerLink={trailerLink}
          setShowTrailer={setShowTrailer}
        />

        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 z-30 flex items-center gap-2 p-1 hover:bg-black/50 rounded"
        >
          <ChevronLeftIcon className="h-7 w-7 text-white" />
        </button>

        <About movie={movie} />

        <hr className="border-gray-500 my-1 w-[95%] mx-auto" />

        <Recommendations relatedMovies={relatedMovies} />

        <MovieCast credits={credits} />

        <MovieImages images={images} />

        <hr className="border-gray-500 my-1 w-[95%] mx-auto" />

        <MovieFooter movie={movie} certification={certification || "Not Rated"} />

      </div>

    );
  }
};

export default MovieDetailPage;
