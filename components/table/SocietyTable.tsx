import React, { useState } from "react";
import placeholder from "../../public/images/person-placeholder.webp";
import axios, { AxiosError } from "axios";
import { useDatabase } from "@/lib/DatabaseContext";

function Table({ data }: { data: Array<any> }) {
  const { state, setState } = useDatabase();
  const [formData, setFormData] = useState<any>();
  const [addCommitteeMember, setAddCommitteeMember] = useState<any>({
    member_name: "",
    contact: "",
    designation: "",
  });
  const [addEmergencyNumber, setAddEmergencyNumber] = useState<any>({
    emergency_name: "",
    emergency_contact: "",
  });
  const [addNewAmenity, setAddNewAmenity] = useState<String | null>();
  const { member_name, contact, designation } = addCommitteeMember;
  const { emergency_name, emergency_contact } = addEmergencyNumber;
  const [addNewSociety, setAddNewSociety] = useState<any | null>({
    name: "",
    address: "",
    image: "jabsj",
    committee_members: [],
    emergency_numbers: [],
    wings: [
      {
        1: {
          id: "1kjbew",
          name: "A",
          floors: 3,
          flat_count_per_floor: 5,
        },
      },
    ],
    amenities: [],
  });
  const {
    name,
    address,
    image,
    committee_members,
    emergency_numbers,
    wings,
    amenities,
  } = addNewSociety;
  const fetchSocieties = async () => {
    const data = await axios.get(
      "https://marquis-backend.onrender.com/society/getAllSocieties"
    );
    return data.data;
  };
  const handleSocietyDelete = async (society_id: string) => {
    if (society_id) {
      const data = await axios
        .post("https://marquis-backend.onrender.com/society/deleteSociety", {
          society_id,
        })
        .then((response) => {
          console.log(response);
          fetchSocieties()
            .then((p) =>
              setState((prevState: any) => ({
                ...prevState,
                societies: p.data,
              }))
            )
            .catch((e: Error | AxiosError) => console.log(e));
        });
    }
  };

  const handleSocietyUpdateModal = async (value: any) => {
    setFormData(value);
  };
  const handleUpdateSociety = async () => {
    if (formData) {
      const data = await axios
        .post(
          "https://marquis-backend.onrender.com/society/updateSociety",
          formData
        )
        .then((response) => {
          console.log(response);
          fetchSocieties()
            .then((p) =>
              setState((prevState: any) => ({
                ...prevState,
                societies: p.data,
              }))
            )
            .catch((e: Error | AxiosError) => console.log(e));
        });
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAddNewSociety((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  console.log("data", addNewSociety);

  const handleAddNewSociety = async () => {
    console.log(addNewSociety);
    if (addNewSociety) {
      const data = await axios
        .post(
          "https://marquis-backend.onrender.com/society/addSociety",
          addNewSociety
        )
        .then((response) => {
          console.log(response);
          fetchSocieties()
            .then((p) =>
              setState((prevState: any) => ({
                ...prevState,
                societies: p.data,
              }))
            )
            .catch((e: Error | AxiosError) => console.log(e));
        });
    }
  };

  const handleCommitteeMemberAddChange = (e: any) => {
    const { name, value } = e.target;
    setAddCommitteeMember((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleEmergencyNumberAddChange = (e: any) => {
    const { name, value } = e.target;
    setAddEmergencyNumber((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div className="overflow-x-auto w-full ">
      <div className="flex w-full mb-4 justify-end">
        <label htmlFor="addsociety-modal" className="btn btn-primary">
          Add Society
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
            <th>Name</th>
            <th>Society Id</th>
            <th>Address</th>
            <th>Amenities</th>
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
                        <div className="font-bold">{value.name}</div>
                        {/* <div className="text-sm opacity-50">United States</div> */}
                      </div>
                    </div>
                  </td>
                  <td>
                    {value.society_id}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      Desktop Support Technician
                    </span>
                  </td>
                  <td>{value.address}</td>
                  <td>{value.amenities[0]}</td>
                  <td className="flex space-x-1">
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => {
                        handleSocietyDelete(value.society_id);
                      }}
                    >
                      Delete
                    </button>
                    <label
                      htmlFor="edit-modal"
                      className="btn btn-info btn-xs"
                      onClick={() => {
                        handleSocietyUpdateModal(value);
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
            <h3 className="font-bold text-lg">Update Society</h3>
            <hr className="my-2" />
            {formData ? (
              <form method="POST">
                <div className="flex flex-col space-y-2 justify-center mt-4">
                  <div className="flex space-x-2">
                    <p className="w-1/5">Name</p>
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
                    <p className="w-1/5">Address</p>
                    <input
                      type="textarea"
                      value={formData.address}
                      onChange={(e) => {
                        setFormData((prevState: any) => ({
                          ...prevState,
                          address: e.target.value,
                        }));
                      }}
                      className="h-5 w-full border border-black p-4 rounded-sm"
                    ></input>
                  </div>
                  <div className="flex space-x-2">
                    <p className="w-1/5">Access Details</p>
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
                    <p className="w-1/5">Allowed By</p>
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
                    <p className="w-1/5">Visitor Contact</p>
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
                      handleUpdateSociety();
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
        <input type="checkbox" id="addsociety-modal" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box relative">
            <label
              htmlFor="addsociety-modal"
              className="btn btn-sm btn-circle bg-primary absolute right-6 top-4"
            >
              ✕
            </label>
            <h3 className="font-bold text-lg">Add New Society</h3>
            <hr className="my-2" />
            <form method="POST">
              <div className="flex flex-col space-y-2 justify-center mt-4">
                <div className="flex space-x-2">
                  <p className="w-1/5">Name</p>
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
                  <p className="w-1/5">Address</p>
                  <input
                    type="textarea"
                    value={address}
                    name="address"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="h-5 w-full border border-black p-4 rounded-sm"
                  ></input>
                </div>
                <div className="flex flex-col space-x-2">
                  <p className="w-full">Committee Members</p>
                  <div className="flex space-x-1 justify-center items-end">
                    <label>
                      Name
                      <input
                        type="textarea"
                        value={member_name}
                        name="member_name"
                        onChange={(e) => {
                          handleCommitteeMemberAddChange(e);
                        }}
                        className="h-5 w-full border border-black p-4 rounded-sm"
                      ></input>
                    </label>
                    <label>
                      Contact
                      <input
                        type="textarea"
                        value={contact}
                        name="contact"
                        onChange={(e) => {
                          handleCommitteeMemberAddChange(e);
                        }}
                        className="h-5 w-full border border-black p-4 rounded-sm"
                      ></input>
                    </label>

                    <label>
                      Designation
                      <input
                        type="textarea"
                        value={designation}
                        name="designation"
                        onChange={(e) => {
                          handleCommitteeMemberAddChange(e);
                        }}
                        className="h-5 w-full border border-black p-4 rounded-sm"
                      ></input>
                    </label>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        addNewSociety.committee_members.push(
                          addCommitteeMember
                        );
                        setAddCommitteeMember({
                          member_name: "",
                          contact: "",
                          designation: "",
                        });
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="flex flex-col space-x-2">
                  <p className="w-full">Emergency Numbers</p>
                  <div className="flex space-x-1 justify-center items-end">
                    <label>
                      Name
                      <input
                        type="textarea"
                        value={emergency_name}
                        name="emergency_name"
                        onChange={(e) => {
                          handleEmergencyNumberAddChange(e);
                        }}
                        className="h-5 w-full border border-black p-4 rounded-sm"
                      ></input>
                    </label>
                    <label>
                      Contact
                      <input
                        type="textarea"
                        value={emergency_contact}
                        name="emergency_contact"
                        onChange={(e) => {
                          handleEmergencyNumberAddChange(e);
                        }}
                        className="h-5 w-full border border-black p-4 rounded-sm"
                      ></input>
                    </label>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        addNewSociety.emergency_numbers.push(
                          addEmergencyNumber
                        );
                        setAddEmergencyNumber({
                          emergency_name: "",
                          emergency_contact: "",
                        });
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="flex flex-col space-x-2">
                  <p className="w-full">Amenities</p>
                  <div className="flex space-x-1 justify-center items-end">
                    <label>
                      Name
                      <input
                        type="textarea"
                        onChange={(e) => {
                          setAddNewAmenity(e.target.value);
                        }}
                        className="h-5 w-full border border-black p-4 rounded-sm"
                      ></input>
                    </label>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        addNewSociety.amenities.push(addNewAmenity);
                        setAddNewAmenity("");
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddNewSociety();
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
