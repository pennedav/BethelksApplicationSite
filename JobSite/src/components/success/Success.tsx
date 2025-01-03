import { Link } from "react-router-dom";
import Layout from "../layout";
import { useParams } from "react-router-dom";

const Success = () => {
  const {type} = useParams()

  if (type == 'application'){
  return (
    <Layout>
      <div className="container max-w-full bg-maroon" id="job-page">
        <h2 className="text-center text-2xl text-white p-2">Success</h2>
      </div>
      <div id="bg" className="bg-gray-100 flex justify-center p-1 md:p-5">
        <p>Job application has been successfully recieved</p>
        <Link to="/" className="text-maroon">Return Home</Link>
        
      </div>
    </Layout>
  );
}else{
  return(
    <Layout>
      <div className="container max-w-full bg-maroon" id="job-page">
        <h2 className="text-center text-2xl text-white p-2">Success</h2>
      </div>
      <div id="bg" className="bg-gray-100 flex justify-center p-1 md:p-5">
        <p>Job has been successfully created/updated</p>
        <Link to="/" className="text-maroon">Return Home</Link>
        
      </div>
    </Layout>
  )
}
};

export default Success;
