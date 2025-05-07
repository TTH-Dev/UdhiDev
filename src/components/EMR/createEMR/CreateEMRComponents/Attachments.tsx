import React, { useEffect, useState } from "react";
import { Form, Upload, Button, message } from "antd";
import { MdUpload } from "react-icons/md";
import { UploadFile } from "antd/es/upload/interface";
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from "axios";
import { api_url } from "../../../../Config";
import moment from "moment";

const Attachments: React.FC = () => {
  const [attachments, setAttachments] = useState<
    { id: number; fileList: UploadFile[] }[]
  >([{ id: 1, fileList: [] }]);

  const handleAddAttachments = () => {
    setAttachments([
      ...attachments,
      { id: attachments.length + 1, fileList: [] },
    ]);
  };

  const handleFileChange = (id: number, fileList: UploadFile[]) => {
    setAttachments(
      attachments.map((att) => (att.id === id ? { ...att, fileList } : att))
    );
  };

  const handleFileRemove = (id: number) => {
    setAttachments(
      attachments.map((att) => (att.id === id ? { ...att, fileList: [] } : att))
    );
  };

  const ids = sessionStorage.getItem("patientId");

  const updateFiles = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const formData = new FormData();
      attachments.forEach((att, _index) => {
        att.fileList.forEach((file, _fileIndex) => {
          if (file.originFileObj) {
            formData.append(`attachments`, file.originFileObj);
          }
        });
      });

      await axios.patch(`${api_url}/api/patient/${ids}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      message.success("Updated Successfully!");
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const [attachmentS, setAttachmentS] = useState<any[]>([]);
  const [editedAttachments, setEditedAttachments] = useState<{
    [key: string]: {
      file: File;
      parentId: string;
    };
  }>({});


  const getAttachments = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }
      const res = await axios.get(
        `${api_url}/api/patient/get-attachments?patientId=${ids}&date=${moment(
          new Date()
        ).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAttachmentS(res.data.data.attachments);
    
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        message.error("Login required!");
        return;
      }

      const formData = new FormData();
      Object.entries(editedAttachments).forEach(
        ([oldFileId, { file, parentId }]) => {
          formData.append("attachmetName", oldFileId);
          formData.append("attachmentId", parentId);
          formData.append("patientId", ids ? ids : "");
          formData.append("attachments", file);
        }
      );

      await axios.post(`${api_url}/api/patient/replace-attachement`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Updated Successfully!");

      await getAttachments();
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAttachments();
  }, []);

  useEffect(() => {
    handleUpdate();
  }, [editedAttachments]);

  return (
    <>
      <div className="emr-complaints-box mt-4 rounded p-4">
        <p className="emr-search-text">Attachments</p>
        <Form layout="vertical">
          {attachments.map((attach) => (
            <div key={attach.id}>
              <Form.Item label={`Upload Image`} name={`file-${attach.id}`}>
                <Upload
                  beforeUpload={() => false}
                  listType="picture"
                  fileList={attach.fileList}
                  onChange={({ fileList }) =>
                    handleFileChange(attach.id, fileList)
                  }
                  onRemove={() => handleFileRemove(attach.id)}
                >
                  {attach.fileList.length === 0 && (
                    <Button icon={<MdUpload />}>Click to Upload</Button>
                  )}
                </Upload>
              </Form.Item>
            </div>
          ))}
        </Form>

        <Button className="add-complaints" onClick={handleAddAttachments}>
          <IoIosAddCircleOutline className="add-icon" /> Add More
        </Button>
      </div>

      <div
        className="d-flex justify-content-end save-cancel-btn mt-4 mb-3"
        style={{ backgroundColor: "white" }}
      >
        {/* <Button className="c-btn me-3">Cancel</Button> */}
        <Button className="s-btn" onClick={updateFiles}>
          Save
        </Button>
      </div>

      <>
        {attachmentS.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="flex gap-4">
              {item.attachment.map((fileId: string) => {
                const ext = fileId.split(".").pop();

                return (
                  <div key={fileId} className="border p-2 rounded">
                    {ext === "pdf" ? (
                      <a
                        style={{ textDecoration: "none" }}
                        href={`${api_url}/public/images/${fileId}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        📄 View PDF
                      </a>
                    ) : (
                      <img
                        src={`${api_url}/public/images/${fileId}`}
                        alt="attachment"
                        loading="lazy"
                        style={{ width: "130px" }}
                        className="w-32 h-32 object-cover"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setEditedAttachments((prev: any) => ({
                            ...prev,
                            [fileId]: {
                              file: e.target.files![0],
                              parentId: item._id,
                            },
                          }));
                        }
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </>
    </>
  );
};

export default Attachments;
