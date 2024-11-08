import { Atom, LoaderPinwheelIcon, LogOut, MedalIcon, PlayIcon, TrophyIcon } from "lucide-react"
import Image from "next/image"
import icon from "@/assets/atlas.png"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { logout } from "@/repository/auth"
import { Button } from "./ui/button"

// Menu items.
const items = [
  {
    title: "Discover",
    url: "/discover",
    icon: Atom,
  }
]

const movies = [
  {
    title: "Now Playing",
    url: "/movies/now-playing",
    icon: PlayIcon,
  },
  {
    title: "Popular",
    url: "/movies/popular",
    icon: MedalIcon,
  },
  {
    title: "Top Rated",
    url: "/movies/top-rated",
    icon: MedalIcon,
  }
]

const shows = [
  {
    title: "On The Air",
    url: "/shows/on-the-air",
    icon: LoaderPinwheelIcon,
  },
  {
    title: "Popular",
    url: "/shows/popular",
    icon: MedalIcon,
  },
  {
    title: "Top Rated",
    url: "/shows/top-rated",
    icon: TrophyIcon,
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex gap-x-3">
          <Image src={icon} alt="Logo" className="h-12 w-12" />
          <h1 className="text-xl font-bold p-4">Atlas</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Movies</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {movies.map((movie) => (
                <SidebarMenuItem key={movie.title}>
                  <SidebarMenuButton asChild>
                    <a href={movie.url}>
                      <movie.icon />
                      <span>{movie.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Shows</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {shows.map((show) => (
                <SidebarMenuItem key={show.title}>
                  <SidebarMenuButton asChild>
                    <a href={show.url}>
                      <show.icon />
                      <span>{show.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button
          onClick={() => {
            logout()
            window.location.href = "/login"
          }}
        >
          <LogOut /> Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
