import React, { useState } from "react";
import placeholder from "../../public/images/person-placeholder.webp";
import axios, { AxiosError } from "axios";
import { useDatabase } from "@/lib/DatabaseContext";

function Table({ data }: { data: Array<any> }) {
  const { state, setState } = useDatabase();
  const [formData, setFormData] = useState<any>();
  const [addNewHelpDesk, setAddNewHelpDesk] = useState<any | null>({
    description: "",
    image: "",
    author_id: "",
    category: "",
    priority: "",
    status: "",
    type: "",
  });
  const { description, image, author_id, category, priority, status, type } =
    addNewHelpDesk;
  const fetchHelpDeskQueries = async () => {
    const data = await axios.get(
      "https://marquis-backend.onrender.com/helpdesk/getAllHelpDeskQueries"
    );
    return data.data;
  };
  const handleQueryDelete = async (helpdesk_id: string) => {
    if (helpdesk_id) {
      const data = await axios
        .post(
          "https://marquis-backend.onrender.com/helpdesk/deleteHelpDeskQuery",
          {
            helpdesk_id,
          }
        )
        .then((response) => {
          console.log(response);
          fetchHelpDeskQueries()
            .then((p) =>
              setState((prevState: any) => ({
                ...prevState,
                helpdesk: p.data,
              }))
            )
            .catch((e: Error | AxiosError) => console.log(e));
        });
    }
  };

  console.log(addNewHelpDesk);

  const handleQueryUpdateModal = async (value: any) => {
    setFormData(value);
  };
  const handleUpdateQuery = async () => {
    if (formData) {
      const data = await axios
        .post(
          "https://marquis-backend.onrender.com/helpdesk/updateHelpDeskQuery",
          formData
        )
        .then((response) => {
          console.log(response);
          fetchHelpDeskQueries()
            .then((p) =>
              setState((prevState: any) => ({
                ...prevState,
                helpdesk: p.data,
              }))
            )
            .catch((e: Error | AxiosError) => console.log(e));
        });
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAddNewHelpDesk((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAddNewActivity = async () => {
    console.log(addNewHelpDesk);
    if (addNewHelpDesk) {
      const data = await axios
        .post(
          "https://marquis-backend.onrender.com/helpdesk/addHelpDeskQuery",
          addNewHelpDesk
        )
        .then((response) => {
          console.log(response);
          fetchHelpDeskQueries()
            .then((p) =>
              setState((prevState: any) => ({
                ...prevState,
                helpdesk: p.data,
              }))
            )
            .catch((e: Error | AxiosError) => console.log(e));
        });
    }
  };

  return (
    <div className="overflow-x-auto w-full ">
      <div className="flex w-full mb-4 justify-end">
        <label htmlFor="addhelpdesk-modal" className="btn btn-primary">
          Add Query
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
            <th>Query Id</th>
            <th>Author Id</th>
            <th>Type</th>
            <th>Status</th>
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
                        <div className="font-bold">{value.helpdesk_id}</div>
                        {/* <div className="text-sm opacity-50">United States</div> */}
                      </div>
                    </div>
                  </td>
                  <td>
                    {value.author_id}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      Desktop Support Technician
                    </span>
                  </td>
                  <td>{value.type}</td>
                  <td>{value.status}</td>
                  <td className="flex space-x-1">
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => {
                        handleQueryDelete(value.helpdesk_id);
                      }}
                    >
                      Delete
                    </button>
                    <label
                      htmlFor="edit-modal"
                      className="btn btn-info btn-xs"
                      onClick={() => {
                        handleQueryUpdateModal(value);
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
            <h3 className="font-bold text-lg">Update Query</h3>
            <hr className="my-2" />
            {formData ? (
              <form method="POST">
                <div className="flex flex-col space-y-2 justify-center mt-4">
                  <div className="flex space-x-2">
                    <p className="w-1/5">Description</p>
                    <input
                      type="textarea"
                      value={formData.description}
                      onChange={(e) => {
                        setFormData((prevState: any) => ({
                          ...prevState,
                          description: e.target.value,
                        }));
                      }}
                      className="h-5 w-full border border-black p-4 rounded-sm"
                    ></input>
                  </div>
                  <div className="flex space-x-2">
                    <p className="w-1/5">Author Id</p>
                    <input
                      type="textarea"
                      value={formData.author_id}
                      onChange={(e) => {
                        setFormData((prevState: any) => ({
                          ...prevState,
                          author_id: e.target.value,
                        }));
                      }}
                      className="h-5 w-full border border-black p-4 rounded-sm"
                    ></input>
                  </div>
                  <div className="flex space-x-2">
                    <p className="w-1/5">Category</p>
                    <input
                      type="textarea"
                      value={formData.category}
                      onChange={(e) => {
                        setFormData((prevState: any) => ({
                          ...prevState,
                          category: e.target.value,
                        }));
                      }}
                      className="h-5 w-full border border-black p-4 rounded-sm"
                    ></input>
                  </div>
                  <div className="flex space-x-2">
                    <p className="w-1/5">Status</p>
                    <input
                      type="textarea"
                      value={formData.status}
                      onChange={(e) => {
                        setFormData((prevState: any) => ({
                          ...prevState,
                          status: e.target.value,
                        }));
                      }}
                      className="h-5 w-full border border-black p-4 rounded-sm"
                    ></input>
                  </div>
                  <div className="flex space-x-2">
                    <p className="w-1/5">Type</p>
                    <input
                      type="textarea"
                      value={formData.type}
                      onChange={(e) => {
                        setFormData((prevState: any) => ({
                          ...prevState,
                          type: e.target.value,
                        }));
                      }}
                      className="h-5 w-full border border-black p-4 rounded-sm"
                    ></input>
                  </div>
                  <div className="flex space-x-2">
                    <p className="w-1/5">Priority</p>
                    <input
                      type="textarea"
                      value={formData.priority}
                      onChange={(e) => {
                        setFormData((prevState: any) => ({
                          ...prevState,
                          priority: e.target.value,
                        }));
                      }}
                      className="h-5 w-full border border-black p-4 rounded-sm"
                    ></input>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleUpdateQuery();
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
          id="addhelpdesk-modal"
          className="modal-toggle"
        />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box relative">
            <label
              htmlFor="addhelpdesk-modal"
              className="btn btn-sm btn-circle bg-primary absolute right-6 top-4"
            >
              ✕
            </label>
            <h3 className="font-bold text-lg">Add New Query</h3>
            <hr className="my-2" />
            <form method="POST">
              <div className="flex flex-col space-y-2 justify-center mt-4">
                <div className="flex space-x-2">
                  <p className="w-1/5">Description</p>
                  <input
                    type="textarea"
                    value={description}
                    name="description"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="h-5 w-full border border-black p-4 rounded-sm"
                  ></input>
                </div>
                <div className="flex space-x-2">
                  <p className="w-1/5">Author Id</p>
                  <input
                    type="textarea"
                    value={author_id}
                    name="author_id"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="h-5 w-full border border-black p-4 rounded-sm"
                  ></input>
                </div>
                <div className="flex space-x-2">
                  <p className="w-1/5">Category</p>
                  <input
                    type="textarea"
                    value={category}
                    name="category"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="h-5 w-full border border-black p-4 rounded-sm"
                  ></input>
                </div>
                <div className="flex space-x-2">
                  <p className="w-1/5">Status</p>
                  <input
                    type="textarea"
                    value={status}
                    name="status"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="h-5 w-full border border-black p-4 rounded-sm"
                  ></input>
                </div>
                <div className="flex space-x-2">
                  <p className="w-1/5">Type</p>
                  <input
                    type="textarea"
                    value={type}
                    name="type"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="h-5 w-full border border-black p-4 rounded-sm"
                  ></input>
                </div>
                <div className="flex space-x-2">
                  <p className="w-1/5">Priority</p>
                  <input
                    type="textarea"
                    value={priority}
                    name="priority"
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
