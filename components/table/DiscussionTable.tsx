import React, { useState } from "react";
import placeholder from "../../public/images/person-placeholder.webp";
import axios, { AxiosError } from "axios";
import { useDatabase } from "@/lib/DatabaseContext";

function DiscussionTable({ data }: { data: Array<any> }) {
  const { state, setState } = useDatabase();
  const [formData, setFormData] = useState<any>();
  const [addNewDiscussion, setAddNewDiscussion] = useState<any | null>({
    title: "",
    image: "",
    description: "",
    author_id: "",
  });
  const { title, image, description, author_id } = addNewDiscussion;
  const fetchDiscussions = async () => {
    const data = await axios.get(
      "https://marquis-backend.onrender.com/discussion/getAllDiscussions"
    );
    return data.data;
  };
  const handleDiscussionDelete = async (discussion_id: string) => {
    if (discussion_id) {
      const data = await axios
        .post(
          "https://marquis-backend.onrender.com/discussion/deleteDiscussion",
          {
            discussion_id,
          }
        )
        .then((response) => {
          console.log(response);
          fetchDiscussions()
            .then((p) =>
              setState((prevState: any) => ({
                ...prevState,
                discussions: p.data,
              }))
            )
            .catch((e: Error | AxiosError) => console.log(e));
        });
    }
  };

  console.log(formData);

  const handleDiscussionUpdateModal = async (value: any) => {
    setFormData(value);
  };
  const handleUpdateDiscussion = async () => {
    if (formData) {
      const data = await axios
        .post(
          "https://marquis-backend.onrender.com/discussion/updateDiscussion",
          formData
        )
        .then((response) => {
          console.log(response);
          fetchDiscussions()
            .then((p) =>
              setState((prevState: any) => ({
                ...prevState,
                discussions: p.data,
              }))
            )
            .catch((e: Error | AxiosError) => console.log(e));
        });
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAddNewDiscussion((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAddNewDiscussion = async () => {
    console.log(addNewDiscussion);
    if (addNewDiscussion) {
      const data = await axios
        .post(
          "https://marquis-backend.onrender.com/discussion/addDiscussion",
          addNewDiscussion
        )
        .then((response) => {
          console.log(response);
          fetchDiscussions()
            .then((p) =>
              setState((prevState: any) => ({
                ...prevState,
                discussions: p.data,
              }))
            )
            .catch((e: Error | AxiosError) => console.log(e));
        });
    }
  };

  return (
    <div className="overflow-x-auto w-full ">
      <div className="flex w-full mb-4 justify-end">
        <label htmlFor="adddiscussion-modal" className="btn btn-primary">
          Add Discussion
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
            <th>Discussion Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Author Id</th>
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
                        <div className="font-bold">{value.discussion_id}</div>
                        {/* <div className="text-sm opacity-50">United States</div> */}
                      </div>
                    </div>
                  </td>
                  <td>
                    {value.title}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      Desktop Support Technician
                    </span>
                  </td>
                  <td>{value.description}</td>
                  <td>{value.author_id}</td>
                  <td className="flex space-x-1">
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => {
                        handleDiscussionDelete(value.discussion_id);
                      }}
                    >
                      Delete
                    </button>
                    <label
                      htmlFor="edit-modal"
                      className="btn btn-info btn-xs"
                      onClick={() => {
                        handleDiscussionUpdateModal(value);
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
            <h3 className="font-bold text-lg">Update Discussion</h3>
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
                    <p className="w-1/5">Title</p>
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
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleUpdateDiscussion();
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
          id="adddiscussion-modal"
          className="modal-toggle"
        />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box relative">
            <label
              htmlFor="adddiscussion-modal"
              className="btn btn-sm btn-circle bg-primary absolute right-6 top-4"
            >
              ✕
            </label>
            <h3 className="font-bold text-lg">Add New Discussion</h3>
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
                  <p className="w-1/5">Title</p>
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
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddNewDiscussion();
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

export default DiscussionTable;
