import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "../../styles/SingleBlog.module.css";
// import wp from "../../styles/Wp.min.css";

const Slug = () => {
  const router = useRouter();
  
  if (typeof window !== 'undefined') {
    var slug = router.query.slug || localStorage.getItem('lastId')
    localStorage.setItem('lastId', slug)
    // console.log('You are on the browser')
  } else {
    // console.log('You are on the server')
  }
  

  const [postData, setpostData] = useState([]);
  const listPost = async () => {
    let response = await fetch(
      `http://localhost/wordpress-rest/wp-json/wp/v2/posts?slug=${slug}&_embed`
    );
    let res = await response.json();
    setpostData(res);
    res.map((item) => {
      console.log(item);
    });
  };
  useEffect(() => {
    listPost();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            {postData.map((item, index) => (
              <div key={index}>
                <img
                  src={item._embedded["wp:featuredmedia"][0].source_url}
                  alt=""
                  width="300"
                />
                <h3>{item.title.rendered}</h3>
                <p className={styles.main}
                  dangerouslySetInnerHTML={{ __html: item.content.rendered }}
                />
              </div>
            ))}
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Slug;
