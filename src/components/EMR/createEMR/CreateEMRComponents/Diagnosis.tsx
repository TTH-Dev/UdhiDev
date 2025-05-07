import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import { Table, Input, Button, Form, Checkbox, InputNumber, Modal } from "antd";
import { InputRef } from "antd";
import { IoClose } from "react-icons/io5";

interface DiagnosisRow {
  diagnosis: string;
  sinceYears: string;
  sinceMonths: string;
  sinceDays: string;
  isChronic: boolean;
  isPrimary: boolean;
}

interface FormValues {
  diagnoses: DiagnosisRow[];
}

const DiagnosisForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedRow, setSelectedRow] = useState<DiagnosisRow | null>(null);

  const handleOpenModal = (index: number) => {
    setSelectedIndex(index);
    setSelectedRow(diagnoses[index]);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedIndex !== null) {
      console.log("Deleting entry at index:", selectedIndex);
    }
    setIsModalOpen(false);
  };

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      diagnoses: [
        {
          diagnosis: "",
          sinceYears: "",
          sinceMonths: "",
          sinceDays: "",
          isChronic: false,
          isPrimary: false,
        },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "diagnoses",
  });

  const diagnoses = useWatch({ control, name: "diagnoses" });
  const lastRow = diagnoses?.[diagnoses.length - 1];

  useEffect(() => {
    if (!lastRow) return;

    if (
      lastRow.diagnosis.trim() ||
      lastRow.sinceDays.trim() ||
      lastRow.sinceMonths.trim() ||
      lastRow.sinceYears.trim() ||
      lastRow.isChronic ||
      lastRow.isPrimary
    ) {
      append({
        diagnosis: "",
        sinceYears: "",
        sinceMonths: "",
        sinceDays: "",
        isChronic: false,
        isPrimary: false,
      });
    }
  }, [lastRow, append]);

  const inputRefs = useRef<Record<string, InputRef | null>>({});

  const onSubmit = (data: FormValues) => {
    console.log("Submitted Data:", data);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldName: string,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const fieldNames = [
        "diagnosis",
        "sinceDays",
        "sinceMonths",
        "sinceYears",
        "isChronic",
        "isPrimary",
      ];
      const currentIndex = fieldNames.indexOf(fieldName);

      if (currentIndex !== -1) {
        if (currentIndex < fieldNames.length - 1) {
          const nextField = fieldNames[currentIndex + 1];
          setTimeout(() => {
            inputRefs.current[`${nextField}-${index}`]?.focus();
          }, 0);
        } else {
          setTimeout(() => {
            inputRefs.current[`diagnosis-${index + 1}`]?.focus();
          }, 0);
        }
      }
    }
  };

  const columns = [
    {
      title: "Diagnosis",
      dataIndex: "diagnosis",
      width: 200,

      render: (_: any, __: any, index: number) => (
        <Controller
          name={`diagnoses.${index}.diagnosis`}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              ref={(el) => {
                inputRefs.current[`diagnosis-${index}`] = el;
              }}
              onKeyDown={(e) => handleKeyDown(e, "diagnosis", index)}
            />
          )}
        />
      ),
    },
    {
      title: "Since (D/M/Y)",
      dataIndex: "since",
      width: 300,
      render: (_: any, __: any, index: number) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Controller
            name={`diagnoses.${index}.sinceDays`}
            control={control}
            render={({ field }) => (
              <div
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <InputNumber
                  {...field}
                  placeholder="D"
                  min={0}
                  style={{ width: "60px", appearance: "textfield" }}
                  className="no-arrow-inputs"
                  ref={(el) => {
                    inputRefs.current[`sinceDays-${index}`] =
                      el as InputRef | null;
                  }}
                  onKeyDown={(e) => handleKeyDown(e, "sinceDays", index)}
                />
                <span className="ms-1">D</span>
              </div>
            )}
          />
          <Controller
            name={`diagnoses.${index}.sinceMonths`}
            control={control}
            render={({ field }) => (
              <div
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <InputNumber
                  {...field}
                  placeholder="M"
                  min={0}
                  max={12}
                  style={{ width: "60px", appearance: "textfield" }}
                  className="no-arrow-inputs"
                  ref={(el) => {
                    inputRefs.current[`sinceMonths-${index}`] =
                      el as InputRef | null;
                  }}
                  onKeyDown={(e) => handleKeyDown(e, "sinceMonths", index)}
                />
                <span className="ms-1">M</span>
              </div>
            )}
          />
          <Controller
            name={`diagnoses.${index}.sinceYears`}
            control={control}
            render={({ field }) => (
              <div
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <InputNumber
                  {...field}
                  placeholder="Y"
                  min={0}
                  style={{ width: "80px", appearance: "textfield" }}
                  className="no-arrow-inputs"
                  ref={(el) => {
                    inputRefs.current[`sinceYears-${index}`] =
                      el as InputRef | null;
                  }}
                  onKeyDown={(e) => handleKeyDown(e, "sinceYears", index)}
                />
                <span className="ms-1">Y</span>
              </div>
            )}
          />
        </div>
      ),
    },

    {
      title: "Is It Chronic",
      dataIndex: "isChronic",
      width: 200,
      render: (_: any, __: any, index: number) => (
        <Controller
          name={`diagnoses.${index}.isChronic`}
          control={control}
          render={({ field }) => (
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Checkbox
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
              <span>Yes</span>
            </div>
          )}
        />
      ),
    },
    {
      title: " Is It Primary Diagnosis",
      dataIndex: "isPrimary",
      width: 200,

      render: (_: any, __: any, index: number) => (
        <Controller
          name={`diagnoses.${index}.isPrimary`}
          control={control}
          render={({ field }) => (
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Checkbox
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
              <span>Yes</span>
            </div>
          )}
        />
      ),
    },
    {
      title: "",
      dataIndex: "delete",
      width: 200,

      render: (_: any, __: any, index: number) => (
        <Controller
          name={`diagnoses.${index}.isPrimary`}
          control={control}
          render={({ }) => (
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Button
                type="text"
                danger
                onClick={() => handleOpenModal(index)}
                style={{ fontSize: "16px", color: "red" }}
              >
                <IoClose />
              </Button>
            </div>
          )}
        />
      ),
    },
  ];

  return (
    <>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="">
        <Table
          dataSource={fields}
          pagination={false}
          bordered
          rowKey={(_, index) =>
            index !== undefined ? index.toString() : Math.random().toString()
          }
          columns={columns}
        />

        <div className="d-flex justify-content-end save-cancel-btn mt-4">
          <Button className="c-btn me-3">Cancel</Button>
          <Button className="s-btn">Save</Button>
        </div>
      </Form>

      <Modal
        title="Confirm Delete"
        open={isModalOpen}
        onOk={handleConfirmDelete}
        onCancel={() => setIsModalOpen(false)}
      >
        {selectedRow && (
          <div>
            <p>
              <strong>Diagnosis:</strong> {selectedRow.diagnosis}
            </p>
            <p>
              <strong>Since:</strong> {selectedRow.sinceDays} Days,{" "}
              {selectedRow.sinceMonths} Months, {selectedRow.sinceYears} Years
            </p>
            <p>
              <strong>Chronic:</strong> {selectedRow.isChronic ? "Yes" : "No"}
            </p>
            <p>
              <strong>Primary:</strong> {selectedRow.isPrimary ? "Yes" : "No"}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default DiagnosisForm;
