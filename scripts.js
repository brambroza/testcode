// scripts.js

document.addEventListener("DOMContentLoaded", function () {
  const serviceTypeSelect = document.getElementById("service-type");
  const devicesSection = document.getElementById("devices-section");
  const addDeviceBtn = document.getElementById("add-device-btn");
  const devicesContainer = document.getElementById("devices-container");
  const otherServicesSection = document.getElementById(
    "other-services-section"
  );
  const attachmentInfo = document.getElementById("attachment-info");
  const maForm = document.getElementById("ma-form");

  // ฟังก์ชันในการเพิ่มอุปกรณ์ใหม่
  function addDevice(serviceType) {
    const deviceIndex = devicesContainer.children.length + 1;

    const deviceDiv = document.createElement("div");
    deviceDiv.classList.add("device-item");

    deviceDiv.innerHTML = `
            <button type="button" class="remove-device" title="ลบอุปกรณ์"><i class="fa fa-trash"></i></button>
            <h3>อุปกรณ์ที่ ${deviceIndex}</h3>
            ${
              serviceType === "MA Fortigate"
                ? `
            <!-- MA Fortigate Layout -->
            <div class="form-row">
                <div class="form-group">
                    <label for="model-${deviceIndex}">รุ่น</label>
                    <input type="text" id="model-${deviceIndex}" name="model[]" placeholder="กรอกรุ่นของอุปกรณ์">
                </div>
                <div class="form-group">
                    <label for="serial-number-${deviceIndex}">Serial Number</label>
                    <input type="text" id="serial-number-${deviceIndex}" name="serial-number[]" placeholder="กรอก Serial Number ของอุปกรณ์">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="forticloud-${deviceIndex}">FortiCloud</label>
                    <div class="select-wrapper">
                        <select id="forticloud-${deviceIndex}" name="forticloud[]">
                            <option value="">-- เลือก --</option>
                            <option value="ต้องการต่อ MA">ต้องการต่อ MA</option>
                            <option value="ไม่ต้องการต่อ MA">ไม่ต้องการต่อ MA</option>
                        </select>
                        <i class="fa fa-chevron-down"></i>
                    </div>
                </div>
                <div class="form-group">
                    <label for="ma-duration-${deviceIndex}">ระยะเวลาต่อ MA</label>
                    <div class="select-wrapper">
                        <select id="ma-duration-${deviceIndex}" name="ma-duration[]">
                            <option value="">-- เลือกระยะเวลา --</option>
                            <option value="1 ปี">1 ปี</option>
                            <option value="2 ปี">2 ปี</option>
                            <option value="3 ปี">3 ปี</option>
                        </select>
                        <i class="fa fa-chevron-down"></i>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="advance-replacement-${deviceIndex}">Advance Replacement</label>
                    <div class="select-wrapper">
                        <select id="advance-replacement-${deviceIndex}" name="advance-replacement[]">
                            <option value="">-- เลือก --</option>
                            <option value="Yes, Engineer on site Configuration">Yes, Engineer on site Configuration</option>
                            <option value="Yes, Drop-Off">Yes, Drop-Off</option>
                            <option value="No, Phone and Email Support (Non Onsite)">No, Phone and Email Support (Non Onsite)</option>
                        </select>
                        <i class="fa fa-chevron-down"></i>
                    </div>
                </div>
                <div class="form-group">
                    <label for="sla-${deviceIndex}">Service-Level Agreement (SLA)</label>
                    <div class="select-wrapper">
                        <select id="sla-${deviceIndex}" name="sla[]">
                            <option value="">-- เลือก SLA --</option>
                            <option value="24x7x4">24x7x4</option>
                            <option value="24x7xNBD">24x7xNBD</option>
                            <option value="8x5x4">8x5x4</option>
                            <option value="8x5xNBD">8x5xNBD</option>
                        </select>
                        <i class="fa fa-chevron-down"></i>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="additional-details-${deviceIndex}">รายละเอียดอื่นๆ</label>
                <textarea id="additional-details-${deviceIndex}" name="additional-details[]" rows="3" placeholder="กรอกรายละเอียดเพิ่มเติม"></textarea>
            </div>
            <!-- แนบไฟล์ -->
            <section id="attachments-section-${deviceIndex}">
                <h2>แนบไฟล์</h2>
                <div class="form-group">
                    <div class="dropzone" id="dropzone-${deviceIndex}">
                        <i class="fa fa-upload"></i>
                        <p>ลากและวางไฟล์ที่นี่ หรือคลิกเพื่อเลือกไฟล์</p>
                        <input type="file" id="attachments-${deviceIndex}" name="attachments-${deviceIndex}[]" multiple accept=".doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png">
                    </div>
                    <div id="file-list-${deviceIndex}" class="file-list"></div>
                    <!-- ข้อความแนบไฟล์ -->
                    <label>ลูกค้าสามารถแนบไฟล์รายการอุปกรณ์ที่ต้องการต่อ MA หรือข้อมูลเพิ่มเติมอื่นๆ</label>
                </div>
            </section>
            `
                : `
            <!-- MA Cisco & MA Server Layout -->
            <div class="form-row">
                <div class="form-group">
                    <label for="model-${deviceIndex}">รุ่น</label>
                    <input type="text" id="model-${deviceIndex}" name="model[]" placeholder="กรอกรุ่นของอุปกรณ์">
                </div>
                <div class="form-group">
                    <label for="part-number-${deviceIndex}">Part Number</label>
                    <input type="text" id="part-number-${deviceIndex}" name="part-number[]" placeholder="กรอก Part Number ของอุปกรณ์">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="serial-number-${deviceIndex}">Serial Number</label>
                    <input type="text" id="serial-number-${deviceIndex}" name="serial-number[]" placeholder="กรอก Serial Number ของอุปกรณ์">
                </div>
                <div class="form-group">
                    <label for="ma-by-${deviceIndex}">MA By</label>
                    <div class="select-wrapper">
                        <select id="ma-by-${deviceIndex}" name="ma-by[]">
                            <option value="">-- เลือก --</option>
                            <option value="เจ้าของผลิตภัณฑ์">เจ้าของผลิตภัณฑ์</option>
                            <option value="NIS Teams">NIS Teams</option>
                        </select>
                        <i class="fa fa-chevron-down"></i>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="ma-duration-${deviceIndex}">ระยะเวลาต่อ MA</label>
                    <div class="select-wrapper">
                        <select id="ma-duration-${deviceIndex}" name="ma-duration[]">
                            <option value="">-- เลือกระยะเวลา --</option>
                            <option value="1 ปี">1 ปี</option>
                            <option value="2 ปี">2 ปี</option>
                            <option value="3 ปี">3 ปี</option>
                        </select>
                        <i class="fa fa-chevron-down"></i>
                    </div>
                </div>
                <div class="form-group">
                    <label for="advance-replacement-${deviceIndex}">Advance Replacement</label>
                    <div class="select-wrapper">
                        <select id="advance-replacement-${deviceIndex}" name="advance-replacement[]">
                            <option value="">-- เลือก --</option>
                            <option value="Yes, Engineer on site Configuration">Yes, Engineer on site Configuration</option>
                            <option value="Yes, Drop-Off">Yes, Drop-Off</option>
                            <option value="No, Phone and Email Support (Non Onsite)">No, Phone and Email Support (Non Onsite)</option>
                        </select>
                        <i class="fa fa-chevron-down"></i>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="sla-${deviceIndex}">Service-Level Agreement (SLA)</label>
                    <div class="select-wrapper">
                        <select id="sla-${deviceIndex}" name="sla[]">
                            <option value="">-- เลือก SLA --</option>
                            <option value="24x7x4">24x7x4</option>
                            <option value="24x7xNBD">24x7xNBD</option>
                            <option value="8x5x4">8x5x4</option>
                            <option value="8x5xNBD">8x5xNBD</option>
                        </select>
                        <i class="fa fa-chevron-down"></i>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="additional-details-${deviceIndex}">รายละเอียดอื่นๆ</label>
                <textarea id="additional-details-${deviceIndex}" name="additional-details[]" rows="3" placeholder="กรอกรายละเอียดเพิ่มเติม"></textarea>
            </div>
            <!-- แนบไฟล์ -->
            <section id="attachments-section-${deviceIndex}">
                <h2>แนบไฟล์</h2>
                <div class="form-group">
                    <div class="dropzone" id="dropzone-${deviceIndex}">
                        <i class="fa fa-upload"></i>
                        <p>ลากและวางไฟล์ที่นี่ หรือคลิกเพื่อเลือกไฟล์</p>
                        <input type="file" id="attachments-${deviceIndex}" name="attachments-${deviceIndex}[]" multiple accept=".doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png">
                    </div>
                    <div id="file-list-${deviceIndex}" class="file-list"></div>
                    <!-- ข้อความแนบไฟล์ -->
                    <label>ลูกค้าสามารถแนบไฟล์รายการอุปกรณ์ที่ต้องการต่อ MA หรือข้อมูลเพิ่มเติมอื่นๆ</label>
                </div>
            </section>
            `
            }
        `;

    devicesContainer.appendChild(deviceDiv);

    // เพิ่ม event listener สำหรับปุ่มลบอุปกรณ์
    const removeBtn = deviceDiv.querySelector(".remove-device");
    removeBtn.addEventListener("click", function () {
      devicesContainer.removeChild(deviceDiv);
      updateDeviceHeaders();

      // ตรวจสอบหากไม่มีอุปกรณ์เหลือ ให้แสดงปุ่มเพิ่มอุปกรณ์
      if (devicesContainer.children.length === 0) {
        addDeviceBtn.style.display = "inline-flex";
      }
    });

    // เพิ่ม event listener สำหรับ Dropzone ของอุปกรณ์ใหม่
    if (serviceType !== "Other") {
      const currentDropzone = deviceDiv.querySelector(
        `.dropzone#dropzone-${deviceIndex}`
      );
      const currentAttachmentsInput = deviceDiv.querySelector(
        `input[type="file"]#attachments-${deviceIndex}`
      );
      const currentFileList = deviceDiv.querySelector(
        `#file-list-${deviceIndex}`
      );

      currentDropzone.addEventListener("dragover", function (e) {
        e.preventDefault();
        currentDropzone.classList.add("dragover");
      });

      currentDropzone.addEventListener("dragleave", function (e) {
        e.preventDefault();
        currentDropzone.classList.remove("dragover");
      });

      currentDropzone.addEventListener("drop", function (e) {
        e.preventDefault();
        currentDropzone.classList.remove("dragover");
        const files = e.dataTransfer.files;
        handleFiles(files, currentFileList);
      });

      currentDropzone.addEventListener("click", function () {
        currentAttachmentsInput.click();
      });

      currentAttachmentsInput.addEventListener("change", function () {
        const files = this.files;
        handleFiles(files, currentFileList);
      });
    }

    // สำหรับ MA Fortigate ให้สามารถเพิ่มอุปกรณ์ได้
    if (serviceType === "MA Fortigate") {
      addDeviceBtn.style.display = "inline-flex";
    }
  }

  // ฟังก์ชันในการอัพเดตหมายเลขอุปกรณ์หลังการลบ
  function updateDeviceHeaders() {
    const deviceItems = devicesContainer.querySelectorAll(".device-item");
    deviceItems.forEach((device, index) => {
      const header = device.querySelector("h3");
      header.textContent = `อุปกรณ์ที่ ${index + 1}`;
    });
  }

  // ฟังก์ชันในการแสดงฟิลด์อุปกรณ์ตามประเภทบริการ
  function updateDevicesSection(serviceType) {
    // ล้างอุปกรณ์ทั้งหมด
    devicesContainer.innerHTML = "";

    // หากเป็น MA Fortigate, MA Cisco, หรือ MA Server ให้เพิ่มอุปกรณ์ทันที
    if (
      serviceType === "MA Fortigate" ||
      serviceType === "MA Cisco" ||
      serviceType === "MA Server"
    ) {
      addDevice(serviceType);
    }

    // สำหรับ MA Fortigate ให้แสดงปุ่มเพิ่มอุปกรณ์
    if (serviceType === "MA Fortigate") {
      addDeviceBtn.style.display = "inline-flex";
    } else if (serviceType === "MA Cisco" || serviceType === "MA Server") {
      addDeviceBtn.style.display = "inline-flex";
    } else {
      addDeviceBtn.style.display = "none";
    }
  }

  // แสดงหรือซ่อนส่วนอุปกรณ์และบริการอื่นๆตามประเภทบริการที่เลือก
  serviceTypeSelect.addEventListener("change", function () {
    const selectedService = this.value;
    if (selectedService === "Other") {
      otherServicesSection.style.display = "block";
      devicesSection.style.display = "none";
      attachmentInfo.style.display = "none";
      devicesContainer.innerHTML = "";
      // ล้างไฟล์แนบหลักหากมี
      const mainFileList = document.getElementById("file-list");
      if (mainFileList) mainFileList.innerHTML = "";
    } else if (
      selectedService === "MA Fortigate" ||
      selectedService === "MA Cisco" ||
      selectedService === "MA Server"
    ) {
      otherServicesSection.style.display = "none";
      devicesSection.style.display = "block";
      attachmentInfo.style.display = "block";
      updateDevicesSection(selectedService);
    } else {
      otherServicesSection.style.display = "none";
      devicesSection.style.display = "none";
      attachmentInfo.style.display = "none";
      devicesContainer.innerHTML = "";
      // ล้างไฟล์แนบหลักหากมี
      const mainFileList = document.getElementById("file-list");
      if (mainFileList) mainFileList.innerHTML = "";
    }
  });

  // เมื่อคลิกเพิ่มอุปกรณ์ (เฉพาะ MA Fortigate, MA Cisco และ MA Server)
  addDeviceBtn.addEventListener("click", function () {
    const selectedService = serviceTypeSelect.value;
    if (
      selectedService === "MA Fortigate" ||
      selectedService === "MA Cisco" ||
      selectedService === "MA Server"
    ) {
      addDevice(selectedService);
    }
  });

  // ฟังก์ชันในการจัดการไฟล์
  function handleFiles(files, fileListContainer) {
    for (let i = 0; i < files.length; i++) {
      addFileItem(files[i], fileListContainer);
    }
    // ไม่รีเซ็ตค่า input เพื่อให้สามารถเลือกไฟล์เดียวกันได้อีกครั้ง
  }

  function addFileItem(file, fileListContainer) {
    const fileItem = document.createElement("div");
    fileItem.classList.add("file-item");

    // เลือกไอคอนตามประเภทไฟล์
    let fileIcon;
    if (file.type.includes("image/")) {
      fileIcon = '<i class="fa fa-file-image"></i>';
    } else if (
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "application/msword"
    ) {
      fileIcon = '<i class="fa fa-file-word"></i>';
    } else if (
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/vnd.ms-excel"
    ) {
      fileIcon = '<i class="fa fa-file-excel"></i>';
    } else {
      fileIcon = '<i class="fa fa-file"></i>';
    }

    fileItem.innerHTML = `
            ${fileIcon}
            <span class="file-name">${file.name}</span>
            <button type="button" class="remove-file" title="ลบไฟล์"><i class="fa fa-times"></i></button>
        `;

    fileListContainer.appendChild(fileItem);

    // เพิ่ม event listener สำหรับปุ่มลบไฟล์
    const removeFileBtn = fileItem.querySelector(".remove-file");
    removeFileBtn.addEventListener("click", function () {
      fileListContainer.removeChild(fileItem);
    });
  }

  // จัดการส่งแบบฟอร์ม
  maForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    let formDataTypeMAFortigate;
    if (document.getElementById("service-type").value === "MA Fortigate") {
      let docno = "|";
      for (let i = 0; i < devicesContainer.children.length; i++) {
        let x = i + 1;

        const fileInput = document.getElementById(`attachments-${x}`);
        const files = fileInput.files;

        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
          formData.append("formFiles", files[i]);
        }

        formData.append("cmpName", document.getElementById("company").value);
        formData.append(
          "contactName",
          document.getElementById("full-name").value
        );
        formData.append("contactPhone", document.getElementById("phone").value);
        formData.append("contactEmail", document.getElementById("email").value);
        formData.append("address", document.getElementById("address").value);
        formData.append(
          "contactPosition",
          document.getElementById("position").value
        );
        formData.append(
          "serviceType",
          document.getElementById("service-type").value
        );
        formData.append("model", document.getElementById(`model-${x}`).value);
        formData.append(
          "serial",
          document.getElementById(`serial-number-${x}`).value
        );
        formData.append(
          "forticloud",
          document.getElementById(`forticloud-${x}`).value
        );
        formData.append(
          "maDuration",
          document.getElementById(`ma-duration-${x}`).value
        );
        formData.append(
          "advanceReplacement",
          document.getElementById(`advance-replacement-${x}`).value
        );
        formData.append("sla", document.getElementById(`sla-${x}`).value);
        formData.append(
          "additionalDetail",
          document.getElementById(`additional-details-${x}`).value
        );

        // Append formApp value
        formData.append("fromApp", "webpage");
        formData.append("docno", docno);

        console.log("formData", formData);
        await axios
          .post("https://localhost:7046/sendMAFortigate", formData, {
            headers: {
              "Content-Type": "multipart/form-data", // Important for file uploads
            },
          })
          .then((response) => {
            docno = response.data[0]["Column1"];
            console.log("response", docno);
          })
          .catch((error) => {
            alert("มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง");
            console.error(error);
          });
      }

      alert("ส่งแบบฟอร์มเรียบร้อยแล้ว! ขอบคุณที่ใช้บริการ..");
    }

    if (
      document.getElementById("service-type").value === "MA Cisco" ||
      document.getElementById("service-type").value === "MA Server"
    ) {
      let docno = "|";
      for (let i = 0; i < devicesContainer.children.length; i++) {
        let x = i + 1;

        const fileInput = document.getElementById(`attachments-${x}`);
        const files = fileInput.files;

        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
          formData.append("formFiles", files[i]);
        }

        formData.append("cmpName", document.getElementById("company").value);
        formData.append(
          "contactName",
          document.getElementById("full-name").value
        );
        formData.append("contactPhone", document.getElementById("phone").value);
        formData.append("contactEmail", document.getElementById("email").value);
        formData.append("address", document.getElementById("address").value);
        formData.append(
          "contactPosition",
          document.getElementById("position").value
        );
        formData.append(
          "serviceType",
          document.getElementById("service-type").value
        );
        formData.append("model", document.getElementById(`model-${x}`).value);
        formData.append(
          "partNumber",
          document.getElementById(`part-number-${x}`).value
        );
        formData.append(
          "serial",
          document.getElementById(`serial-number-${x}`).value
        );
        formData.append("maBy", document.getElementById(`ma-by-${x}`).value);
        formData.append(
          "maDuration",
          document.getElementById(`ma-duration-${x}`).value
        );
        formData.append(
          "advanceReplacement",
          document.getElementById(`advance-replacement-${x}`).value
        );
        formData.append("sla", document.getElementById(`sla-${x}`).value);
        formData.append(
          "additionalDetail",
          document.getElementById(`additional-details-${x}`).value
        );

        // Append formApp value
        formData.append("fromApp", "webpage");
        formData.append("docno", docno);

        await axios
          .post("https://localhost:7046/sendMASiscoServer", formData, {
            headers: {
              "Content-Type": "multipart/form-data", // Important for file uploads
            },
          })
          .then((response) => {
            docno = response.data[0]["Column1"];
            console.log("response", docno);
          })
          .catch((error) => {
            alert("มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง");
            console.error(error);
          });
      }
      alert("ส่งแบบฟอร์มเรียบร้อยแล้ว! ขอบคุณที่ใช้บริการ..");
    }

    if (document.getElementById("service-type").value === "Other") {
      let selectservice = [];
      const checkboxes = document.querySelectorAll(
        'input[name="desired-service[]"]:checked'
      );
      checkboxes.forEach((checkbox) => {
        selectservice.push(checkbox.value);
      });

      const fileInput = document.getElementById("attachments");
      const files = fileInput.files;

      let docno = "|";
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append("formFiles", files[i]);
      }

      formData.append("cmpName", document.getElementById("company").value);
      formData.append(
        "contactName",
        document.getElementById("full-name").value
      );
      formData.append("contactPhone", document.getElementById("phone").value);
      formData.append("contactEmail", document.getElementById("email").value);
      formData.append("address", document.getElementById("address").value);
      formData.append(
        "contactPosition",
        document.getElementById("position").value
      );
      formData.append(
        "serviceType",
        document.getElementById("service-type").value
      );
      formData.append(
        "additionalDetail",
        document.getElementById("other-details").value
      );
      formData.append("desiredService", selectservice.join(", "));

      // Append formApp value
      formData.append("fromApp", "webpage");
      formData.append("docno", docno);
      await axios
        .post("https://localhost:7046/sendReqOther", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        })
        .then((response) => {
          docno = response.data[0]["Column1"];
          console.log("response", docno);
          alert("ส่งแบบฟอร์มเรียบร้อยแล้ว! ขอบคุณที่ใช้บริการ..");
        })
        .catch((error) => {
          alert("มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง");
          console.error(error);
        });
    }

    maForm.reset();
    devicesContainer.innerHTML = "";
    devicesSection.style.display = "none";
    otherServicesSection.style.display = "none";
    attachmentInfo.style.display = "none";
    // ล้างไฟล์แนบหลักหากมี
    const mainFileList = document.getElementById("file-list");
    if (mainFileList) mainFileList.innerHTML = "";

    // ล้างไฟล์แนบในบริการอื่นๆ
    const otherFileList = document.getElementById("other-file-list");
    if (otherFileList) otherFileList.innerHTML = "";
  });
});
