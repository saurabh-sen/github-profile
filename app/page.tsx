"use client"
import Image from 'next/image'
import { DiGithubBadge } from 'react-icons/di'
import { RiGitRepositoryCommitsLine } from 'react-icons/ri'
import { AiOutlineClockCircle, AiOutlineLink } from 'react-icons/ai'
import { IoLocationOutline } from 'react-icons/io5'
import { GoPeople } from 'react-icons/go'
import React from 'react'
import Link from 'next/link'
import Lottie from 'lottie-react'
import github from "../public/githubcat.json"

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

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    setUsername(username);
  }

  const handleSearchUser = async (e: React.MouseEvent) => {
    e.preventDefault();
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    setUserInfo(data);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 font-mono">
      <div className="username_input flex flex-col max-w-xl gap-1">
        <Header />
        <SearchUser username={username} handleSearchUser={handleSearchUser} handleUsernameChange={handleUsernameChange} />
        {
          userInfo && <UserInfoCard user={userInfo} />
        }
      </div>
    </main>
  )
}

const Header = () => {
  return (
    <>
      <div className="heading flex gap-2 items-center">
        <span className="searchIcon hidden sm:block">
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" fill='#7d8590' viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </span>
        <h1 className="text-2xl font-bold ">Search for a GitHub user</h1>
      </div>
      <p className="description text-xs">Display avatar, username, name, public repositories, public gits, profile created history and some basic activity from any user account!</p>
    </>
  )
}

type PropsSearchUser = {
  username: string
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSearchUser: (e: React.MouseEvent) => Promise<void>
}

const SearchUser: React.FC<PropsSearchUser> = ({ username, handleSearchUser, handleUsernameChange }) => {
  return (
    <div className="input__container flex gap-3 text-sm items-center flex-col sm:flex-row ">
      <input type="text" name="username" id="username" placeholder='' className='border border-gray-500 dark:border-[#ffffff42] bg-transparent focus:shadow focus:shadow-[0 0 0 3px #0c2d6b] outline-none focus:border-2 focus:border-[#2a70d4] rounded-md h-[30px] flex-1 px-3 py-1' autoComplete="off" onChange={handleUsernameChange} value={username} />
      <button className="btn px-3 py-1 rounded-md text bg-[#238636] text-white" type='button' onClick={handleSearchUser}>Search user!</button>
    </div>
  )
}

type PropsUserInfoCard = {
  user: TypeUserInfo
}

const UserInfoCard: React.FC<PropsUserInfoCard> = ({ user }) => {

  if (!user) return null;

  const { avatar_url, login, name, bio, followers, following, location, public_repos, public_gists, blog, created_at } = user;

  return (
    <div className="user__info__card flex flex-col gap-6 justify-between w-full mt-5 border border-gray-500 dark:border-[#ffffff42] p-4 sm:p-8 rounded-md shadow-xl">
      <div className="user__bio flex gap-6 sm:gap-12 justify-center sm:justify-between items-center flex-col sm:flex-row">
        <div className="user__bio__left flex flex-col text-center sm:text-left justify-between gap-1">
          <Image src={avatar_url} alt={login} width={200} height={200} className="rounded-full" />
          <p className="user__name text-2xl font-bold">{name}</p>
          <p className="user__username text-xl text-[#7d8590]">@{login}</p>
        </div>
        <div className="user__bio__right flex flex-col gap-1 text-center sm:text-left sm:max-w-[60%]">
          <p className="user__bio ">{bio}</p>
          <div className="user__popularity flex gap-1 items-center mx-auto sm:mx-0">
            <GoPeople color="#7d8590" />
            <span className="followers__count font-semibold">{followers}</span>
            <span className="followers__text text-[#7d8590]">followers</span>
            <span className='text-[#ffffff42]'>-</span>
            <span className="following__count font-semibold">{following}</span>
            <span className="followers__text text-[#7d8590]">following</span>
          </div>
          <UserContent>
            <AiOutlineLink color="#7d8590" />
            <Link href={blog} className="blog hover:text-[#2a70d4]">{blog}</Link>
          </UserContent>
          <UserContent>
            <IoLocationOutline color="#7d8590" />
            <span className="location ">{location}</span>
          </UserContent>
        </div>
      </div>
      <div className="user__content flex gap-12 items-center justify-center sm:justify-between text-xl">
        <div className="user__content__left flex flex-col gap-3">
          <UserContent>
            <AiOutlineClockCircle color="#7d8590" />
            <span className="created_at text-sm">Created At: {created_at.slice(0, 10)}</span>
          </UserContent>
          <UserContent>
            <RiGitRepositoryCommitsLine color="#7d8590" />
            <span className="repositories text-sm">Public Repo&apos;s: {public_repos}</span>
          </UserContent>
          <UserContent>
            <DiGithubBadge color="#7d8590" />
            <span className="gists text-sm">Public Gists: {public_gists}</span>
          </UserContent>
        </div>
        <div className="user__content__right hidden sm:block sm:mr-4 ">
          <Lottie animationData={github} />
        </div>

      </div>
    </div>
  )
}

type PropsUserContent = {
  children: React.ReactNode
}

const UserContent: React.FC<PropsUserContent> = ({ children }) => {
  return (
    <div className="user__location flex gap-2 items-center mx-auto sm:mx-0">
      {children}
    </div>
  )
}