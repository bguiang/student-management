import { useState } from "react";
import { Popconfirm, Switch, Button } from "antd";
import { deleteStudent } from "./client";
import { errorNotification, successNotification } from "./Notification";

const Actions = ({ student, fetchStudents }) => {
  const [deletePopVisible, setDeletePopVisible] = useState(false);
  const [editPopVisible, setEditPopVisible] = useState(false);

  const deleteStudentAction = (s) => {
    console.log(JSON.stringify(s));
    deleteStudent(s.id)
      .then(() => {
        fetchStudents();
        successNotification(
          "Student successfully deleted",
          `${s.name} was added to the system`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Popconfirm
        title={`Are you sure you want to delete ${student.name}`}
        visible={deletePopVisible}
        onVisibleChange={() => {
          setDeletePopVisible(!deletePopVisible);
        }}
        onConfirm={() => {
          deleteStudentAction(student);
        }}
        onCancel={() => {
          console.log("Cancelled");
        }}
        okText="Yes"
        cancelText="No"
      >
        <Button type="primary">Delete</Button>
      </Popconfirm>
      <Button type="primary" style={{ marginLeft: "5px" }}>
        Edit
      </Button>
    </div>
  );
};

export default Actions;
