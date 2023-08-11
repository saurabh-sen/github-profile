"use client"
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClockCircle, AiOutlineLink } from "react-icons/ai";
import { DiGithubBadge } from "react-icons/di";
import { GoPeople } from "react-icons/go";
import { IoLocationOutline } from "react-icons/io5";
import { RiGitRepositoryCommitsLine } from "react-icons/ri";
import Lottie from 'lottie-react'
import github from "../../public/githubcat.json";

type PropsUserInfoCard = {
    user: {
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

export default UserInfoCard