import React from "react";

const AddContact = () => {
  return (
    <div className="absolute w-[100vw] h-[100vh] flex justify-center items-center" >
      <div className="flex flex-col absolute justify-center items-center rounded-lg bg-gray-400 p-5" >
        <h1>Add contact</h1>
        <form action="" className="bg-yellow p-4 flex flex-col">
          <input type="text" className="border-2"/>
          <button>message</button>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
