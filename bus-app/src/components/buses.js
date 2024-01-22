import React from 'react';
import './buses.css';

export default function Buses() {
  return (
    <div style={{ position: 'center', top: '200px', right: '140px' }}>
  <button
    className="btn btn-secondary dropdown-toggle"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    style={{ fontSize: '40px' }}
  >
    Choose Your Bus  {/* This is the updated text */}
  </button>
  <ul className="dropdown-menu" style={{ width: '400px' }}>
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
