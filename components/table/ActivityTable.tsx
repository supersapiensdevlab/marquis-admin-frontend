import React, { useState } from "react";
import placeholder from "../../public/images/person-placeholder.webp";
import axios, { AxiosError } from "axios";
import { useDatabase } from "@/lib/DatabaseContext";

function Table({ data }: { data: Array<any> }) {
  const { state, setState } = useDatabase();
  const [formData, setFormData] = useState<any>();
  const [addNewActivity, setAddNewActivity] = useState<any | null>({
    name: "",
    title: "",
    image: "",
    access_details: "",
    allowed_by: "",
    visitor_contact: "",
  });
  const { name, title, image, access_details, allowed_by, visitor_contact } =
    addNewActivity;
  const fetchActivities = async () => {
    const data = await axios.get(
      "https://marquis-backend.onrender.com/activity/getAllActivities"
    );
    return data.data;
  };
  const handleActivityDelete = async (activity_id: string) => {
    if (activity_id) {
      const data = await axios
        .post("https://marquis-backend.onrender.com/activity/deleteActivity", {
          activity_id,
        })
        .then((response) => {
          console.log(response);
          fetchActivities()
            .then((p) =>
              setState((prevState: any) => ({
                ...prevState,
                activities: p.data,
              }))
            )
            .catch((e: Error | AxiosError) => console.log(e));
        });
    }
  };

  console.log(formData);

  const handleActivityUpdateModal = async (value: any) => {
    setFormData(value);
  };
  const handleUpdateActivity = async () => {
    if (formData) {
      const data = await axios
        .post(
          "https://marquis-backend.onrender.com/activity/updateActivity",
          formData
        )
        .then((response) => {
          console.log(response);
          fetchActivities()
            .then((p) =>
              setState((prevState: any) => ({
                ...prevState,
                activities: p.data,
              }))
            )
            .catch((e: Error | AxiosError) => console.log(e));
        });
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAddNewActivity((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAddNewActivity = async () => {
    console.log(addNewActivity);
    if (addNewActivity) {
      const data = await axios
        .post(
          "https://marquis-backend.onrender.com/activity/addActivity",
          addNewActivity
        )
        .then((response) => {
          console.log(response);
          fetchActivities()
            .then((p) =>
              setState((prevState: any) => ({
                ...prevState,
                activities: p.data,
              }))
            )
            .catch((e: Error | AxiosError) => console.log(e));
        });
    }
  };

  return (
    <div className="overflow-x-auto w-full ">
      <div className="flex w-full mb-4 justify-end">
        <label htmlFor="addactivity-modal" className="btn btn-primary">
          Add Activity
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
            <th>Activity Id</th>
            <th>Name</th>
            <th>Title</th>
            <th>Visitor Contact</th>
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
                        <div className="font-bold">{value.activity_id}</div>
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
                  <td>{value.title}</td>
                  <td>{value.visitor_contact}</td>
                  <td className="flex space-x-1">
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => {
                        handleActivityDelete(value.activity_id);
                      }}
                    >
                      Delete
                    </button>
                    <label
                      htmlFor="edit-modal"
                      className="btn btn-info btn-xs"
                      onClick={() => {
                        handleActivityUpdateModal(value);
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
            <h3 className="font-bold text-lg">Update Activity</h3>
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
                    <p className="w-1/3">Title</p>
                    <input
                      type="textarea"
                      value={formData.title}
                      onChange={(e) => {
                        setFormData((prevState: any) => ({
                          ...prevState,
                          title: e.target.value,
                        }));
                      }}
                      className="h-5 w-full border border-black p-4 rounded-sm"
                    ></input>
                  </div>
                  <div className="flex space-x-2">
                    <p className="w-1/3">Access Details</p>
                    <input
                      type="textarea"
                      value={formData.access_details}
                      onChange={(e) => {
                        setFormData((prevState: any) => ({
                          ...prevState,
                          access_details: e.target.value,
                        }));
                      }}
                      className="h-5 w-full border border-black p-4 rounded-sm"
                    ></input>
                  </div>
                  <div className="flex space-x-2">
                    <p className="w-1/3">Allowed By</p>
                    <input
                      type="textarea"
                      value={formData.allowed_by}
                      onChange={(e) => {
                        setFormData((prevState: any) => ({
                          ...prevState,
                          allowed_by: e.target.value,
                        }));
                      }}
                      className="h-5 w-full border border-black p-4 rounded-sm"
                    ></input>
                  </div>
                  <div className="flex space-x-2">
                    <p className="w-1/3">Visitor Contact</p>
                    <input
                      type="textarea"
                      value={formData.visitor_contact}
                      onChange={(e) => {
                        setFormData((prevState: any) => ({
                          ...prevState,
                          visitor_contact: e.target.value,
                        }));
                      }}
                      className="h-5 w-full border border-black p-4 rounded-sm"
                    ></input>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleUpdateActivity();
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
        <input
          type="checkbox"
          id="addactivity-modal"
          className="modal-toggle"
        />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box relative">
            <label
              htmlFor="addactivity-modal"
              className="btn btn-sm btn-circle bg-primary absolute right-6 top-4"
            >
              ✕
            </label>
            <h3 className="font-bold text-lg">Add New Activity</h3>
            <hr className="my-2" />
            <form method="POST">
              <div className="flex flex-col space-y-3 justify-center mt-4">
                <div className="flex space-x-2">
                  <label className="w-1/3">Name</label>
                  <input
                    type="textarea"
                    value={name}
                    name="name"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="h-5 w-full border border-black p-4 rounded-sm "
                  ></input>
                </div>
                <div className="flex space-x-2">
                  <p className="w-1/3">Title</p>
                  <input
                    type="textarea"
                    value={title}
                    name="title"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="h-5 w-full border border-black p-4 rounded-sm"
                  ></input>
                </div>
                <div className="flex space-x-2">
                  <p className="w-1/3">Access Details</p>
                  <input
                    type="textarea"
                    value={access_details}
                    name="access_details"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="h-5 w-full border border-black p-4 rounded-sm"
                  ></input>
                </div>
                <div className="flex space-x-2">
                  <p className="w-1/3">Allowed By</p>
                  <input
                    type="textarea"
                    value={allowed_by}
                    name="allowed_by"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="h-5 w-full border border-black p-4 rounded-sm"
                  ></input>
                </div>
                <div className="flex space-x-2">
                  <p className="w-1/3">Visitor Contact</p>
                  <input
                    type="textarea"
                    value={visitor_contact}
                    name="visitor_contact"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="h-5 w-full border border-black p-4 rounded-sm"
                  ></input>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddNewActivity();
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
