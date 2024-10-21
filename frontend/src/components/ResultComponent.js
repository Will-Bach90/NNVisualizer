import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function ResultComponent({ result }) {
  return (
    <div className="alert alert-info mt-4" role="alert">
      {result ? <p>{result}</p> : <p>No results yet. Start training!</p>}
    </div>
  );
}

export default ResultComponent;

