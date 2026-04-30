const CardSkeleton = () => {
  return (
    <ul className="car-list-grid">
      {[1, 2, 3, 4].map((n) => (
        <li key={n} className="car-card skeleton-card">
          <div className="car-image-container shimmer"></div>
          <div className="car-content">
            <div className="shimmer skeleton-title"></div>
            <div className="car-specs">
              <div className="shimmer skeleton-spec"></div>
              <div className="shimmer skeleton-spec"></div>
            </div>
            <div className="shimmer skeleton-button"></div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CardSkeleton;