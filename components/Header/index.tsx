"use client"
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

  export default Header;