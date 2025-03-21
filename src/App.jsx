import { useEffect, useState } from "react";
import Formulario from "./Formulario";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import "./index.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Filtrar productos según la búsqueda
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  // Contar solo las categorías de los productos filtrados
  const filteredCategoryData = filteredProducts.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  // Formatear datos para el gráfico
  const chartData = Object.entries(filteredCategoryData).map(([category, count]) => ({
    category,
    count,
  }));

  return (
    <div className="container">
      <h1>Productos</h1>

      <div className="button-container">
        <button className="button" onClick={() => setShowChart(!showChart)}>
          <i class="bi bi-bar-chart"></i>
          Ver Gráfico
        </button>
      </div>

      <Formulario search={search} setSearch={setSearch} />

      <table className="table">
        <thead>
          <tr>
            <th>NOMBRE</th>
            <th>PRECIO</th>
            <th>CATEGORÍA</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showChart && (
        <div className="chart-container">
          <h2>Cantidad de productos por categoría</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#1877F2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
