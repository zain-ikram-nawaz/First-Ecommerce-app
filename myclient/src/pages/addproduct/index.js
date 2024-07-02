"use client";
import { useState } from "react";
import Navbar from "../../components/navbar";



const ProductForm = () => {
  const [originalImage, setOriginalImage] = useState();
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  
  const handleImageChange = (event) => {
    setOriginalImage(event.target.files[0]);
  };

  const handleProductForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("originalImage", originalImage);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("description", description);
    // console.log(formData)

    try {
      const res = await fetch("http://localhost:5000/addProduct", {
        method: "POST",
        body:formData
      });
      if (!res.ok) {
        console.log("Image upload failed");
      } else {
        console.log("Product added successfully");
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
   e.target.reset();
   
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="a-d-f">
        <form onSubmit={handleProductForm} className="add-product-form" encType="multipart/form-data">
         
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="category" >Category:</label>
          <select name="fesds" id="feeds" onChange={(e) => setCategory(e.target.value)} value={description}>
    <option value="" >Select Category</option>
    <option value="roetell">roetell</option>
    <option value="perky pet">perky pet</option>
    <option value="woodlink">woodlink</option>
    <option value="rolli pet">rolli pet</option>
    <option value="C&S products">C&S products </option>
    <option value="backyard chirper">backyard chirper</option>
  </select>
  <br />

           <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            name="originalImage"
            className="image"
          />
          <button type="submit">Add Product</button>
        </form>
      </div>
    </>
  );
};

export default ProductForm;
