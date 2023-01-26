import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { createLeave } from "../../api";
import { toast } from "react-toastify";

function UserList(props) {
  const formik = useFormik({
    initialValues: {
      startDate: new Date(),
      endDate: new Date(),
      daysCount: 1,
      note: "",
    },
    onSubmit: async (values) => {
      const payload = {
        startDate: values.startDate,
        endDate: values.endDate,
        daysCount: values.daysCount,
      };

      if (values.note) {
        payload.note = values.note;
      }

      const response = await createLeave(payload);
      toast("Applied for leave successfully!");
      formik.resetForm();
      console.log({ response });
    },
  });
  return (
    <div>
      <h1>Apply Leave</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="date"
          name="startDate"
          value={formik.values.startDate}
          onChange={formik.handleChange}
        />
        <input
          type="date"
          name="endDate"
          value={formik.values.endDate}
          onChange={formik.handleChange}
        />
        <input
          type="number"
          name="daysCount"
          min={1}
          value={formik.values.daysCount}
          onChange={formik.handleChange}
        />
        <textarea
          name="note"
          value={formik.values.note}
          onChange={formik.handleChange}
          rows="10"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserList;
