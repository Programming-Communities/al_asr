// app/page.js
import BlogList from "@/Components/BlogList";
import Header from "@/Components/Header";


export default function Home() {
  return (
    <>
      <Header />
      <main role="main"> {/* Add main landmark */}
        <BlogList />
      </main>
    </>
  )
}