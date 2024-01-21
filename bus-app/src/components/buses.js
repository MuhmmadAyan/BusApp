import React from 'react';

export default function Buses() {
  return (
    <div style={{ position: 'absolute', top: '170px', right: '140px' }}>
  <button
    className="btn btn-secondary dropdown-toggle"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    style={{ fontSize: '35px' }}
  >
    Choose Your Bus  {/* This is the updated text */}
  </button>
  <ul className="dropdown-menu" style={{ width: '315px' }}>
    {/* Adjust the width value as needed */}
    <li><a className="dropdown-item" href="#">21-A</a></li>
    <li><a className="dropdown-item" href="#">21-B</a></li>
    <li><a className="dropdown-item" href="#">3 </a></li>
    <li><a className="dropdown-item" href="#">4 </a></li>
    <li><a className="dropdown-item" href="#">5 </a></li>
    <li><a className="dropdown-item" href="#">6 </a></li>
    <li><a className="dropdown-item" href="#">3 </a></li>
    <li><a className="dropdown-item" href="#">3 </a></li>
    <li><a className="dropdown-item" href="#">3 </a></li>
    <li><a className="dropdown-item" href="#">3 </a></li>
  </ul>
</div>

  );
}
