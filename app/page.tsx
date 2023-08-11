"use client"
import React from 'react'
import UserInfoCard from "../components/UserInfoCard"
import SearchUser from '@/components/SearchUser'
import Header from '@/components/Header'

type TypeUserInfo = {
  avatar_url: string
  login: string
  name: string
  bio: string
  followers: number
  following: number
  location: string
  public_repos: number
  public_gists: number
  blog: string
  created_at: string
} | null

export default function Home() {

  const [userInfo, setUserInfo] = React.useState<TypeUserInfo>(null);
  const [username, setUsername] = React.useState<string>('');
  const [notFound, setNotFound] = React.useState<boolean>(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    setUsername(username);
  }

  const handleSearchUser = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      if (data.message === 'Not Found') {
        setNotFound(true);
        setUserInfo(null);
        return;
      }
      setUserInfo(data)
      setNotFound(false);
    } catch (error) {
      setNotFound(true);
      setUserInfo(null);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 font-mono">
      <div className="username_input flex flex-col max-w-xl gap-1">
        <Header />
        <SearchUser username={username} handleSearchUser={handleSearchUser} handleUsernameChange={handleUsernameChange} />
        {
          userInfo && <UserInfoCard user={userInfo} />
        }
        {
          notFound && <p className="text-red-500 text-center">User not found</p>
        }
      </div>
    </main>
  )
}