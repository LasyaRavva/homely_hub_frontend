import React, { useEffect } from "react";
import "../../CSS/Accomodation.css";
import ProgressSteps from "../ProgressSteps";

//import AccomodationForm from "./AccomodationForm";
import MyAccomodation from "./MyAccomdation";
import { Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//import { accomodationActions } from "../../Store/Accomodation/Accomodation-slice";
import { getAllAccomodation } from "../../Store/Accomodation/Accomodation-action";
import LoadingSpinner from "../LoadingSpinner";

const Accomodation = () => {
  const dispatch = useDispatch();
  const { accomodation, loading, errors } = useSelector((state) => state.accomodation);
  console.log("Accommodation state:", { accomodation, loading, errors });

  useEffect(() => {
    dispatch(getAllAccomodation());
  }, [dispatch]);

  return (
    <>
      <ProgressSteps accomodation />
      <div className="accom-container">
        <Link to="/accommodationform">
          <button className="add-new-place">+ Add new place</button>
        </Link>
        {loading && <LoadingSpinner />}
        {errors && !loading && (
          <p style={{color: 'red'}}>Error: {errors}</p>
        )}
        {accomodation.length === 0 && !loading && !errors && (
          <p>Accomodation not available</p>
        )}
        {accomodation.length > 0 && !loading && (
          <MyAccomodation accomodation={accomodation} loading={loading} />
        )}
      </div>
    </>
  );
};

export default Accomodation;
