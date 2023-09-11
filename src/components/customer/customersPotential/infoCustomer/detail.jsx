import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  dataShowCusPotential,
  showCustomerPotentialAPI,
  deleteCustomerPotentialAPI,
  listCustomerPotentialAPI,
  addCustomerAPI,
  listCustomerGroupAPI,
  data,
  datasources,
  sourcesAPI,
  listCustomerAPI,
  potentialCustomerToCustomerAPI,
} from "../../../../features/customerSlice";
import DrawerEdit from "../drawerEdit";
import { useDispatch, useSelector } from "react-redux";
import Delete from "../../../../assets/icon/delete.png";
import NoImage from "../../../../assets/icon/no-image.png";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import Select from "react-select";
import Edit from "../../../../assets/icon/edit.png";
import {
  nationsAPI,
  datanations,
  provincesAPI,
  dataprovinces,
  dictrictsAPI,
  datadictricts,
} from "../../../../features/addressSlice";
import { list } from "postcss";

const detail = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalConvert, setshowModalConvert] = useState(false);

  const [customers_group_id, setcustomers_group_id] = useState();
  const [first_name, setfirst_name] = useState();
  const [last_name, setlast_name] = useState();
  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [identity, setidentity] = useState();
  const [address, setaddress] = useState();
  const [district_id, setdistrict_id] = useState();
  const [province_id, setprovince_id] = useState();
  const [nation_id, setnation_id] = useState();
  const [source_id, setsource_id] = useState();
  const [id, setid] = useState();

  const [isOpen, setIsOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const params = {
    customers_group_id: customers_group_id,
    first_name: first_name,
    last_name: last_name,
    email: email,
    phone: phone,
    identity: identity,
    address: address,
    district_id: district_id,
    province_id: province_id,
    nation_id: nation_id,
    source_id: source_id,
    id: id,
  };

  const dispatch = useDispatch();
  const handleSave = () => {
    // alert("hello");
    dispatch(potentialCustomerToCustomerAPI(params));
    showModalConvert(false);
    setTimeout(() => {
      dispatch(listCustomerPotentialAPI());
    }, 500);
  };

  const tmp = useSelector(dataShowCusPotential);
  // console.log(tmp);
  useEffect(() => {
    setcustomers_group_id(tmp?.customers_group_id);
    // setfirst_name(tmp?.first_name);
    setlast_name(tmp?.name);
    setemail(tmp?.email);
    setphone(tmp?.phone);
    setidentity(tmp?.identity);
    setaddress(tmp?.address);
    setdistrict_id(tmp?.districts_id);
    setprovince_id(tmp?.province_id);
    setnation_id(tmp?.nation_id);
    setsource_id(tmp?.source_id);
    setid(tmp?.id);
    dispatch(dictrictsAPI(tmp?.province_id));
  }, [tmp]);

  let listCustomerGroup = useSelector(data);
  let listSources = useSelector(datasources);
  let listNations = useSelector(datanations);
  let listProvinces = useSelector(dataprovinces);
  let listDictricts = useSelector(datadictricts);

  // console.log(listDictricts);

  // useEffect(() => {}, [showModal]);

  useEffect(() => {
    dispatch(showCustomerPotentialAPI(props?.id));
    dispatch(listCustomerGroupAPI());
    dispatch(sourcesAPI());
    dispatch(nationsAPI());
    dispatch(provincesAPI());
    setShowModal(true);
  }, [props?.isOpenDetail]);

  const handleDelete = (id) => {
    dispatch(deleteCustomerPotentialAPI(id));
    setShowModal(false);
    setTimeout(() => {
      dispatch(listCustomerPotentialAPI());
    }, 500);
  };

  const handleShow = () => {
    setShowModal(false);
    setshowModalConvert(true);
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: "10px",
      borderColor: state.isFocused ? "none" : "none",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(0, 118, 255, 0.3)" : null,
      "&:hover": {
        borderColor: state.isFocused ? "none" : "none",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted gray",
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected ? "#0070f3" : "white",
      "&:hover": {
        backgroundColor: "#0070f3",
        color: "white",
      },
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  const handleChangeProvince = (e) => {
    console.log(e);
    setprovince_id(e.value);
    dispatch(dictrictsAPI(e.value));
  };

  const handleChangeSource = (e) => {
    setsource_id(e.value);
  };

  const handleChangeNation = (e) => {
    setnation_id(e.value);
  };

  const handleChangeDistrict = (e) => {
    setdistrict_id(e.value);
  };

  const handleChangeCustomerGroup = (e) => {
    setcustomers_group_id(e.value);
  };

  const handleEdit = () => {
    setModalEdit(true);
    setIsOpen(!isOpen);
  };

  return (
    <>
      {showModal ? (
        <>
          <div
            data-aos="fade-down"
            className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[5000] outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t bg-gradient-to-r from-[#2d50b2] to-[#91a3eb]">
                  <div className="text-base w-full text-white">
                    Chi tiết khách hàng tiềm năng
                  </div>
                  <Button
                    variant="outlined"
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      borderRadius: "10px",
                      padding: "0px 0px 0px 0px",
                    }}
                    onClick={() => setShowModal(false)}
                  >
                    x
                  </Button>
                </div>
                {/*body*/}
                <div className="relative p-5 flex-auto px-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      {modalEdit && (
                        <DrawerEdit id={props?.id} isOpenEdit={isOpen} />
                      )}
                      <Button onClick={() => handleEdit()} variant="outlined">
                        <img src={Edit} alt="edit" className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(tmp?.id)}
                      >
                        <img src={Delete} alt="" className="w-5 h-5" />
                      </Button>
                    </div>
                    <Button
                      onClick={() => handleShow()}
                      variant="outlined"
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        borderColor: "green",
                      }}
                      endIcon={<CachedOutlinedIcon />}
                    >
                      Chuyển Đổi
                    </Button>
                    {/* <div onClick={() => setShowModal(false)}>
                    </div> */}
                  </div>
                  <hr className="col-span-2 mt-4 mb-4" />
                  <div className="my-0 text-slate-500 text-sm leading-relaxed grid grid-cols-2 gap-4 justify-center w-full">
                    <div className="col-span-1 flex-col">
                      <div className="px-2 py-1 bg-[#2d50b245] text-[#2d50b2] rounded">
                        Thông tin mục tiêu
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="px-2 py-1 bg-[#2d50b245] text-[#2d50b2] rounded">
                        Thông tin chung
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="w-80">
                        <div className="text-gray-700 font-semibold">
                          Họ và tên
                        </div>
                        <div className="py-1 px-4 border rounded mt-1">
                          {tmp?.name ? tmp?.name : "không có"}
                        </div>
                      </div>
                      <div className="mt-2 w-80">
                        <div className="text-gray-700 font-semibold">
                          Vị trí
                        </div>
                        <div className="py-1 px-4 border rounded mt-1">
                          {tmp?.position ? tmp?.position : "không có"}
                        </div>
                      </div>
                      <div className="mt-2 w-80">
                        <div className="text-gray-700 font-semibold">
                          Website
                        </div>
                        <div className="py-1 px-4 border rounded mt-1">
                          {tmp?.website ? tmp?.website : "không có"}
                        </div>
                      </div>
                      <div className="mt-2 w-80">
                        <div className="text-gray-700 font-semibold">
                          Điện thoại
                        </div>
                        <div className="py-1 px-4 border rounded mt-1">
                          {tmp?.phone ? tmp?.phone : "không có"}
                        </div>
                      </div>
                      <div className="mt-2 w-80">
                        <div className="text-gray-700 font-semibold">
                          Công ty
                        </div>
                        <div className="py-1 px-4 border rounded mt-1">
                          {tmp?.company ? tmp?.company : "không có"}
                        </div>
                      </div>
                      <div className="mt-2 w-80">
                        <div className="text-gray-700 font-semibold">
                          địa chỉ
                        </div>
                        <div className="py-1 px-4 border rounded mt-1">
                          {tmp?.address ? tmp?.address : "không có"}
                        </div>
                      </div>
                      <div className="mt-2 w-80">
                        <div className="text-gray-700 font-semibold">
                          Tỉnh/Thành phố
                        </div>
                        <div className="py-1 px-4 border rounded mt-1">
                          {tmp?.province_id ? tmp?.province_id : "không có"}
                        </div>
                      </div>
                      <div className="mt-2 w-80">
                        <div className="text-gray-700 font-semibold">
                          Quận/Huyện
                        </div>
                        <div className="py-1 px-4 border rounded mt-1">
                          {tmp?.district_id ? tmp?.district_id : "không có"}
                        </div>
                      </div>
                      <div className="mt-2 w-80">
                        <div className="text-gray-700 font-semibold">
                          Quốc gia
                        </div>
                        <div className="py-1 px-4 border rounded mt-1">
                          {tmp?.nation_id ? tmp?.nation_id : "không có"}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="w-80">
                        <div className="text-gray-700 font-semibold">
                          Trạng thái khách hàng tiềm năng
                        </div>
                        <div className="py-1 px-4 border rounded mt-1">
                          {tmp?.status_name ? tmp?.status_name : "không có"}
                        </div>
                      </div>
                      <div className="w-80 mt-2">
                        <div className="text-gray-700 font-semibold">Nguồn</div>
                        <div className="py-1 px-4 border rounded mt-1">
                          {tmp?.source_id ? tmp?.source_id : "không có"}
                        </div>
                      </div>
                      <div className="w-80 mt-2">
                        <div className="text-gray-700 font-semibold">
                          Giao cho
                        </div>
                        <div className="py-1 px-4 border rounded mt-1">
                          {tmp?.employee_charge_id
                            ? tmp?.employee_charge_id
                            : "không có"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end gap-2 p-[7px] border-t border-solid border-slate-200 rounded-b">
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => setShowModal(false)}
                  >
                    Đóng
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleSave()}
                  >
                    THÊM
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-[4000] bg-black"></div>
        </>
      ) : null}

      {showModalConvert ? (
        <>
          <div
            data-aos="fade-down"
            className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[5000] outline-none focus:outline-none"
          >
            <div className="relative w-fit my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t bg-gradient-to-r from-[#2d50b2] to-[#91a3eb]">
                  <div className="text-base w-full text-white">
                    Chi tiết khách hàng tiềm năng
                  </div>
                  <Button
                    variant="outlined"
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      borderRadius: "10px",
                      padding: "0px 0px 0px 0px",
                    }}
                    onClick={() => setshowModalConvert(false)}
                  >
                    x
                  </Button>
                </div>
                {/*body*/}
                <div className="relative p-5 flex-auto px-6">
                  <div className="relative">
                    <img
                      src="https://demo.smartvcc.vn//assets/images/card_profile.png"
                      alt=""
                      className="rounded-t-2xl w-full h-24 object-cover"
                    />
                    <div className="flex justify-center">
                      <div className="absolute flex justify">
                        <img
                          src={NoImage}
                          alt=""
                          className="bg-white border-4 border-solid border-gray-200 h-28 w-28 rounded-full -mt-14"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-16">
                    <hr className="mb-4" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-1 w-80">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="first_name"
                        >
                          Họ
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="first_name"
                          type="text"
                          onChange={(e) => setfirst_name(e.target.value)}
                          placeholder="Nhập họ"
                        />
                      </div>
                      <div className="col-span-1 w-80">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="last_name"
                        >
                          Tên
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="last_name"
                          type="text"
                          onChange={(e) => setlast_name(e.target.value)}
                          placeholder="Nhập tên"
                          value={last_name}
                        />
                      </div>
                      <div className="col-span-1 w-80">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="phone"
                        >
                          Số điện thoại
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="phone"
                          type="text"
                          onChange={(e) => setphone(e.target.value)}
                          value={phone}
                          placeholder="Nhập số điện thoại"
                        />
                      </div>
                      <div className="col-span-1 w-80">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="email"
                          onChange={(e) => setemail(e.target.value)}
                          type="text"
                          value={email}
                          placeholder="Nhập email"
                        />
                      </div>
                      <div className="col-span-1 w-80">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Nguồn
                        </label>
                        <Select
                          value={listSources.filter(
                            (item) => item.value == source_id
                          )}
                          options={listSources}
                          styles={customStyles}
                          onChange={handleChangeSource}
                          isSearchable={true}
                          isClearable={true}
                        />
                      </div>
                      <div className="col-span-1 w-80">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Nhóm khách hàng
                        </label>
                        <Select
                          value={listCustomerGroup.filter(
                            (item) => item.value == customers_group_id
                          )}
                          options={listCustomerGroup}
                          onChange={handleChangeCustomerGroup}
                          styles={customStyles}
                          isSearchable={true}
                          isClearable={true}
                        />
                      </div>
                      <div className="col-span-1 w-80">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="identity"
                        >
                          CMND / Căn cước công dân
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="identity"
                          type="text"
                          onChange={(e) => setidentity(e.target.value)}
                          value={identity}
                          placeholder="Nhập CMND / Căn cước công dân"
                        />
                      </div>
                      <div className="col-span-1 w-80">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Tỉnh / Thành Phố
                        </label>
                        <Select
                          value={listProvinces.filter(
                            (item) => item.value == province_id
                          )}
                          options={listProvinces}
                          onChange={handleChangeProvince}
                          styles={customStyles}
                          isSearchable={true}
                          isClearable={true}
                        />
                      </div>
                      <div className="col-span-1 w-80">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Quận / Huyện
                        </label>
                        <Select
                          value={setTimeout(() => {
                            listDictricts &&
                              listDictricts.filter(
                                (item) => item.value == district_id
                              );
                          }, 500)}
                          onChange={handleChangeDistrict}
                          options={listDictricts}
                          styles={customStyles}
                          isSearchable={true}
                          isClearable={true}
                        />
                      </div>
                      <div className="col-span-1 w-80">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Quốc gia
                        </label>
                        <Select
                          value={listNations.filter(
                            (item) => item.value == nation_id
                          )}
                          options={listNations}
                          onChange={handleChangeNation}
                          styles={customStyles}
                          isSearchable={true}
                          isClearable={true}
                        />
                      </div>
                      {/* <div className="col-span-1 w-80">
                        <label
                          class="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="email"
                        >
                          Nhóm khách hàng
                        </label>
                        <Select
                          options={dataCustomerGroup}
                          styles={customStyles}
                          isSearchable={true}
                          isClearable={true}
                        />
                      </div> */}
                    </div>
                  </div>
                  {/* <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <DrawerEdit id={tmp?.id} />
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(tmp?.id)}
                      >
                        <img src={Delete} alt="" className="w-5 h-5" />
                      </Button>
                    </div>
                    <Button
                      variant="outlined"
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        borderColor: "green",
                      }}
                      endIcon={<CachedOutlinedIcon />}
                    >
                      Chuyển Đổi
                    </Button>
                  </div>
                  <hr className="col-span-2 mt-4 mb-4" />
                  <div className="my-0 text-slate-500 text-sm leading-relaxed grid grid-cols-2 gap-4 justify-center w-full">
                    <div className="col-span-1 flex-col">
                      <div className="px-2 py-1 bg-[#2d50b245] text-[#2d50b2] rounded">
                        Thông tin mục tiêu
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="px-2 py-1 bg-[#2d50b245] text-[#2d50b2] rounded">
                        Thông tin chung
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="w-80">
                        <div className="text-gray-700 font-semibold">
                          Họ và tên
                        </div>
                        <div className="py-1 px-4 border rounded mt-1">
                          {tmp?.name ? tmp?.name : "không có"}
                        </div>
                      </div>
                      <div className="mt-2 w-80">
                        <div className="text-gray-700 font-semibold">
                          Vị trí
                        </div>
                        <div className="py-1 px-4 border rounded mt-1">
                          {tmp?.position ? tmp?.position : "không có"}
                        </div>
                      </div>
                      <div className="mt-2 w-80">
                        <div className="text-gray-700 font-semibold">
                          Website
                        </div>
                        <div className="py-1 px-4 border rounded mt-1">
                          {tmp?.website ? tmp?.website : "không có"}
                        </div>
                      </div>
                      <div className="mt-2 w-80">
                        <div className="text-gray-700 font-semibold">
                          Điện thoại
                        </div>
                        <div className="py-1 px-4 border rounded mt-1">
                          {tmp?.phone ? tmp?.phone : "không có"}
                        </div>
                      </div>
                      <div className="mt-2 w-80">
                        <div className="text-gray-700 font-semibold">
                          Công ty
                        </div>
                        <div className="py-1 px-4 border rounded mt-1">
                          {tmp?.company ? tmp?.company : "không có"}
                        </div>
                      </div>
                      <div className="mt-2 w-80">
                        <div className="text-gray-700 font-semibold">
                          địa chỉ
                        </div>
                        <div className="py-1 px-4 border rounded mt-1">
                          {tmp?.address ? tmp?.address : "không có"}
                        </div>
                      </div>
                      <div className="mt-2 w-80">
                        <div className="text-gray-700 font-semibold">
                          Tỉnh/Thành phố
                        </div>
                        <div className="py-1 px-4 border rounded mt-1">
                          {tmp?.province_id ? tmp?.province_id : "không có"}
                        </div>
                      </div>
                      <div className="mt-2 w-80">
                        <div className="text-gray-700 font-semibold">
                          Quận/Huyện
                        </div>
                        <div className="py-1 px-4 border rounded mt-1">
                          {tmp?.district_id ? tmp?.district_id : "không có"}
                        </div>
                      </div>
                      <div className="mt-2 w-80">
                        <div className="text-gray-700 font-semibold">
                          Quốc gia
                        </div>
                        <div className="py-1 px-4 border rounded mt-1">
                          {tmp?.nation_id ? tmp?.nation_id : "không có"}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="w-80">
                        <div className="text-gray-700 font-semibold">
                          Trạng thái khách hàng tiềm năng
                        </div>
                        <div className="py-1 px-4 border rounded mt-1">
                          {tmp?.status_name ? tmp?.status_name : "không có"}
                        </div>
                      </div>
                      <div className="w-80 mt-2">
                        <div className="text-gray-700 font-semibold">Nguồn</div>
                        <div className="py-1 px-4 border rounded mt-1">
                          {tmp?.source_id ? tmp?.source_id : "không có"}
                        </div>
                      </div>
                      <div className="w-80 mt-2">
                        <div className="text-gray-700 font-semibold">
                          Giao cho
                        </div>
                        <div className="py-1 px-4 border rounded mt-1">
                          {tmp?.employee_charge_id
                            ? tmp?.employee_charge_id
                            : "không có"}
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end gap-2 p-[7px] border-t border-solid border-slate-200 rounded-b">
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => setshowModalConvert(false)}
                  >
                    Đóng
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleSave()}
                  >
                    THÊM
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-[4000] bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default detail;
