// app/page.js
import BlogList from "@/components/BlogList";
import Header from "@/components/Header";


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