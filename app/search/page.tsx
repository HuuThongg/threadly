import { SearchWrapper } from "./_components/searchWrapper"

export default function SearchPage() {
  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-between px-5">
      <div className="min-h-screen w-full max-w-[640px]">
        <div className="flex flex-col py-2">
          <div className="flex h-[60px] w-full items-center justify-center">
            <p className="m-4">Search</p>
          </div>
          <SearchWrapper />
          <div></div>
        </div>
      </div>
    </div>
  )
}
