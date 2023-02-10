import React, { useState } from "react";
import placeholder from "../../public/images/person-placeholder.webp";
import axios, { AxiosError } from "axios";
import { useDatabase } from "@/lib/DatabaseContext";

function Table({ data }: { data: Array<any> }) {
  const { state, setState } = useDatabase();
  const [formData, setFormData] = useState<any>();
  const [addNewAmenity, setAddNewAmenity] = useState<any | null>({
    name: "",
    image: "",
    working_hours: {
      startTime: null,
      endTime: null,
    },
  });
  const { name, image, working_hours } = addNewAmenity;
  const fetchAmenities = async () => {
    const data = await axios.get(
      "https://marquis-backend.onrender.com/amenity/getAllAmenities"
    );
    return data.data;
  };
  const handleAmenityDelete = async (amenity_id: string) => {
    if (amenity_id) {
      const data = await axios
        .post("https://marquis-backend.onrender.com/amenity/deleteAmenity", {
          amenity_id,
        })
        .then((response) => {
          console.log(response);
          fetchAmenities()
            .then((p) =>
              setState((prevState: any) => ({
                ...prevState,
                amenities: p.data,
              }))
            )
            .catch((e: Error | AxiosError) => console.log(e));
        });
    }
  };

  console.log(formData);

  const handleAmenityUpdateModal = async (value: any) => {
    setFormData(value);
  };
  const handleUpdateAmenity = async () => {
    if (formData) {
      const data = await axios
        .post(
          "https://marquis-backend.onrender.com/amenity/updateAmenity",
          formData
        )
        .then((response) => {
          console.log(response);
          fetchAmenities()
            .then((p) =>
              setState((prevState: any) => ({
                ...prevState,
                amenities: p.data,
              }))
            )
            .catch((e: Error | AxiosError) => console.log(e));
        });
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAddNewAmenity((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAddNewAmenity = async () => {
    console.log(addNewAmenity);
    if (addNewAmenity) {
      const data = await axios
        .post(
          "https://marquis-backend.onrender.com/amenity/addAmenity",
          addNewAmenity
        )
        .then((response) => {
          console.log(response);
          fetchAmenities()
            .then((p) =>
              setState((prevState: any) => ({
                ...prevState,
                amenities: p.data,
              }))
            )
            .catch((e: Error | AxiosError) => console.log(e));
        });
    }
  };

  console.log(formData);

  return (
    <div className="overflow-x-auto w-full ">
      <div className="flex w-full mb-4 justify-end">
        <label htmlFor="addamenity-modal" className="btn btn-primary">
          Add Amenity
        </label>
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Amenity Id</th>
            <th>Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((value, key) => {
              return (
                <tr key={key}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={placeholder.src}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{value.amenity_id}</div>
                        {/* <div className="text-sm opacity-50">United States</div> */}
                      </div>
                    </div>
                  </td>
                  <td>
                    {value.name}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      Desktop Support Technician
                    </span>
                  </td>
                  <td>{value.working_hours?.startTime}</td>
                  <td>{value.working_hours?.endTime}</td>
                  <td className="flex space-x-1">
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => {
                        handleAmenityDelete(value.amenity_id);
                      }}
                    >
                      Delete
                    </button>
                    <label
                      htmlFor="edit-modal"
                      className="btn btn-info btn-xs"
                      onClick={() => {
                        handleAmenityUpdateModal(value);
                      }}
                    >
                      Edit
                    </label>
                  </td>
                </tr>
              );
            })}
        </tbody>
        {/* <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </tfoot> */}
      </table>
      <div>
        <input type="checkbox" id="edit-modal" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box relative">
            <label
              htmlFor="edit-modal"
              className="btn btn-sm btn-circle bg-primary absolute right-6 top-4"
            >
              ✕
            </label>
            <h3 className="font-bold text-lg">Update Amenity</h3>
            <hr className="my-2" />
            {formData ? (
              <form method="POST">
                <div className="flex flex-col space-y-3 justify-center mt-4">
                  <div className="flex space-x-2">
                    <p className="w-1/3">Name</p>
                    <input
                      type="textarea"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData((prevState: any) => ({
                          ...prevState,
                          name: e.target.value,
                        }));
                      }}
                      className="h-5 w-full border border-black p-4 rounded-sm"
                    ></input>
                  </div>
                  <div className="flex space-x-2">
                    <p className="w-1/3">Start Time</p>
                    <input
                      type="time"
                      value={formData.working_hours.startTime}
                      onChange={(e) => {
                        formData.working_hours.startTime = e.target.value;
                      }}
                      className="h-5 w-full border border-black p-4 rounded-sm"
                    ></input>
                  </div>
                  <div className="flex space-x-2">
                    <p className="w-1/3">Title</p>
                    <input
                      type="time"
                      value={formData.working_hours.endTime}
                      onChange={(e) => {
                        formData.working_hours.endTime = e.target.value;
                      }}
                      className="h-5 w-full border border-black p-4 rounded-sm"
                    ></input>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleUpdateAmenity();
                    }}
                    className="btn btn-primary"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div>
        <input type="checkbox" id="addamenity-modal" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box relative">
            <label
              htmlFor="addamenity-modal"
              className="btn btn-sm btn-circle bg-primary absolute right-6 top-4"
            >
              ✕
            </label>
            <h3 className="font-bold text-lg">Add New Amenity</h3>
            <hr className="my-2" />
            <form method="POST">
              <div className="flex flex-col space-y-2 justify-center mt-4">
                <div className="flex space-x-2">
                  <p className="w-1/3">Name</p>
                  <input
                    type="textarea"
                    value={name}
                    name="name"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="h-5 w-full border border-black p-4 rounded-sm"
                  ></input>
                </div>
                <div className="flex space-x-2">
                  <p className="w-1/3">Start Time</p>
                  <input
                    type="time"
                    value={working_hours.startTime}
                    onChange={(e) => {
                      addNewAmenity.working_hours.startTime = e.target.value;
                    }}
                    className="h-5 w-full border border-black p-4 rounded-sm"
                  ></input>
                </div>
                <div className="flex space-x-2">
                  <p className="w-1/3">End Time</p>
                  <input
                    type="time"
                    value={working_hours.endTime}
                    onChange={(e) => {
                      addNewAmenity.working_hours.endTime = e.target.value;
                    }}
                    className="h-5 w-full border border-black p-4 rounded-sm"
                  ></input>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddNewAmenity();
                  }}
                  className="btn btn-primary"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
