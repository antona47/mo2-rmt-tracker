import Image from "next/image"





const Header = () => {
  return (
    <div className="w-full">
      <div className="flex flex-row w-full max-w-5xl mx-auto justify-center py-10 px-8">
        <Image src="/henrik.png" alt="Henrique" width="152" height="187" className="mt-4 mr-20" />
      </div>
    </div>
  )
}





export default Header