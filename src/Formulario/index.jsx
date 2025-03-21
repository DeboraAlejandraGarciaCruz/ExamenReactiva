import React, { useState } from 'react';
export default function Formulario({ search, setSearch }) {
    return (
      <div className="input-container">
        <i class="bi bi-search"></i>
        <input
          type="text"
          placeholder="Buscar por nombre o categoría..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    );
  }
  