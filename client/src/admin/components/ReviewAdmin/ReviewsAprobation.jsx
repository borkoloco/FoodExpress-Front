import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllReviews,
  updateReviewStatus,
} from "../../../redux/actions/action";

function ReviewsAprobation() {
  const dispatch = useDispatch();
  const allreviews = useSelector((state) => state.allreviews);
  const [force, setForce] = useState(true);

  useEffect(() => {
    dispatch(getAllReviews());
  }, []);

  useEffect(() => {
    // dispatch(getAllReviews());
    setForce(!force);
  }, [allreviews]);

  // Filtra los comentarios con estado "Pendiente"
  const pendingReviews = allreviews.filter((review) => review.idStatus === 1);

  const handleApprove = async (idReview) => {
    await dispatch(updateReviewStatus(idReview, 2));
    await dispatch(getAllReviews());
    setForce(!force);
  };
  const handleReject = async (idReview) => {
    await dispatch(updateReviewStatus(idReview, 3));
    await dispatch(getAllReviews());
    setForce(!force);
  };

  const handleApproveAll = async () => {
    for (const review of pendingReviews) {
      await dispatch(updateReviewStatus(review.idReview, 2));
    }
    await dispatch(getAllReviews());
    setForce(!force);
  };

  const handleRejectAll = async () => {
    for (const review of pendingReviews) {
      await dispatch(updateReviewStatus(review.idReview, 3));
    }
    await dispatch(getAllReviews());
    setForce(!force);
  };
  return (
    <div>
      <h3 style={{ textAlign: "center", margin: "0" }}>
        Comments Pending Moderation
      </h3>
      {pendingReviews.length > 0 ? (
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ width: "10%" }}>Status</th>
              <th style={{ width: "60%" }}>Comment</th>
              <th style={{ width: "30%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingReviews.map((review, index) => (
              <tr key={review.idReview}>
                <td>
                  {review.reviewStatus
                    ? review.reviewStatus.statusDescription
                    : "error?"}
                </td>
                <td
                  style={{
                    maxWidth: "250px",
                    wordWrap: "break-word",
                    color: review.idStatus === 3 ? "red" : "black",
                    borderBottom:
                      index < pendingReviews.length - 1
                        ? "1px solid #ddd"
                        : "none",
                  }}
                >
                  {review.comment}
                </td>
                <td>
                  <button onClick={() => handleApprove(review.idReview)}>
                    🟢
                  </button>
                  <button onClick={() => handleReject(review.idReview)}>
                    🔴
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>There are no comments pending moderation.</p>
      )}
      <div
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        <button
          onClick={handleApproveAll}
          disabled={pendingReviews.length === 0}
          style={{ marginRight: "10px" }}
        >
          Approve all
        </button>
        <button
          onClick={handleRejectAll}
          disabled={pendingReviews.length === 0}
        >
          Reject All
        </button>
      </div>
    </div>
  );
}

export default ReviewsAprobation;
