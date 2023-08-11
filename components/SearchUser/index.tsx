"use client"
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

  export default SearchUser;