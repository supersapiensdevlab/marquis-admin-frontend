import React, { useState } from "react";
import placeholder from "../../public/images/person-placeholder.webp";
import axios, { AxiosError } from "axios";
import { useDatabase } from "@/lib/DatabaseContext";

function DailyHelpTable({ data }: { data: Array<any> }) {
  const { state, setState } = useDatabase();
  const [formData, setFormData] = useState<any>();
  const [addNewDailyHelp, setAddNewDailyHelp] = useState<any | null>({
    name: "",
    image: "",
    hours: "",
    contact: "",
    type: "",
    author_id: "",
  });
  const { name, image, hours, contact, type, author_id } = addNewDailyHelp;
  const fetchDailyHelps = async () => {
    const data = await axios.get(
      "https://marquis-backend.onrender.com/dailyhelp/getAllDailyHelps"
    );
    return data.data;
  };
  const handleDailyHelpDelete = async (dailyhelp_id: string) => {
    if (dailyhelp_id) {
      const data = await axios
        .post(
          "https://marquis-backend.onrender.com/dailyhelp/deleteDailyHelp",
          {
            dailyhelp_id,
          }
        )
        .then((response) => {
          console.log(response);
          fetchDailyHelps()
            .then((p) =>
              setState((prevState: any) => ({
                ...prevState,
                dailyhelp: p.data,
              }))
            )
            .catch((e: Error | AxiosError) => console.log(e));
        });
    }
  };

  console.log(formData);

  const handleDailyHelpUpdateModal = async (value: any) => {
    setFormData(value);
  };
  const handleUpdateDailyHelp = async () => {
    if (formData) {
      const data = await axios
        .post(
          "https://marquis-backend.onrender.com/dailyhelp/updateDailyHelp",
          formData
        )
        .then((response) => {
          console.log(response);
          fetchDailyHelps()
            .then((p) =>
              setState((prevState: any) => ({
                ...prevState,
                dailyhelp: p.data,
              }))
            )
            .catch((e: Error | AxiosError) => console.log(e));
        });
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAddNewDailyHelp((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAddNewDailyHelp = async () => {
    console.log(addNewDailyHelp);
    if (addNewDailyHelp) {
      const data = await axios
        .post(
          "https://marquis-backend.onrender.com/dailyhelp/addDailyHelp",
          addNewDailyHelp
        )
        .then((response) => {
          console.log(response);
          fetchDailyHelps()
            .then((p) =>
              setState((prevState: any) => ({
                ...prevState,
                dailyhelp: p.data,
              }))
            )
            .catch((e: Error | AxiosError) => console.log(e));
        });
    }
  };

  return (
    <div className="overflow-x-auto w-full ">
      <div className="flex w-full mb-4 justify-end">
        <label htmlFor="adddailyhelp-modal" className="btn btn-primary">
          Add DailyHelp
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
            <th>DailyHelp Id</th>
            <th>Name</th>
            <th>Contact</th>
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
                        <div className="font-bold">{value.dailyhelp_id}</div>
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
                  <td>{value.contact}</td>
                  <td>{value.author_id}</td>
                  <td className="flex space-x-1">
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => {
                        handleDailyHelpDelete(value.dailyhelp_id);
                      }}
                    >
                      Delete
                    </button>
                    <label
                      htmlFor="edit-modal"
                      className="btn btn-info btn-xs"
                      onClick={() => {
                        handleDailyHelpUpdateModal(value);
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
            <h3 className="font-bold text-lg">Update DailyHelp</h3>
            <hr className="my-2" />
            {formData ? (
              <form method="POST">
                <div className="flex flex-col space-y-2 justify-center mt-4">
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
                    <p className="w-1/3">Hours</p>
                    <input
                      type="textarea"
                      value={formData.hours}
                      onChange={(e) => {
                        setFormData((prevState: any) => ({
                          ...prevState,
                          hours: e.target.value,
                        }));
                      }}
                      className="h-5 w-full border border-black p-4 rounded-sm"
                    ></input>
                  </div>
                  <div className="flex space-x-2">
                    <p className="w-1/3">Contact</p>
                    <input
                      type="textarea"
                      value={formData.contact}
                      onChange={(e) => {
                        setFormData((prevState: any) => ({
                          ...prevState,
                          contact: e.target.value,
                        }));
                      }}
                      className="h-5 w-full border border-black p-4 rounded-sm"
                    ></input>
                  </div>
                  <div className="flex space-x-2">
                    <p className="w-1/3">Type</p>
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
                    <p className="w-1/3">Author Id</p>
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
                      handleUpdateDailyHelp();
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
          id="adddailyhelp-modal"
          className="modal-toggle"
        />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box relative">
            <label
              htmlFor="adddailyhelp-modal"
              className="btn btn-sm btn-circle bg-primary absolute right-6 top-4"
            >
              ✕
            </label>
            <h3 className="font-bold text-lg">Add New DailyHelp</h3>
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
                  <p className="w-1/3">Hours</p>
                  <input
                    type="textarea"
                    value={hours}
                    name="hours"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="h-5 w-full border border-black p-4 rounded-sm"
                  ></input>
                </div>
                <div className="flex space-x-2">
                  <p className="w-1/3">Contact</p>
                  <input
                    type="textarea"
                    value={contact}
                    name="contact"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="h-5 w-full border border-black p-4 rounded-sm"
                  ></input>
                </div>
                <div className="flex space-x-2">
                  <p className="w-1/3">Type</p>
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
                  <p className="w-1/3">Author Id</p>
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
                    handleAddNewDailyHelp();
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

export default DailyHelpTable;
