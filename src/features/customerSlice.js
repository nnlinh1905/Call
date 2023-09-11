import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  listCustomerGroup,
  addCustomerGroup,
  editCustomerGroup,
  deleteCustomerGroup,
  listCustomer,
  addCustomer,
  editCustomer,
  checkActive,
  showCustomer,
  sources,
  historyCustomer,
  historyCustomerUpdate,
  listCustomerPotential,
  addCustomerPotential,
  editCustomerPotential,
  deleteCustomerPotential,
  listStatus,
  addStatus,
  editStatus,
  deleteStatus,
  showCustomerPotential,
  potentialCustomerToCustomer,
  sourcesUpdate,
  sourcesAdd,
  sourcesDetele,
} from "../services/customer";
import { toast } from "react-toastify";

export const listCustomerGroupAPI = createAsyncThunk(
  "Customer/list",
  async (request) => {
    const data = await listCustomerGroup(request);
    return data;
  }
);

export const addCustomerGroupAPI = createAsyncThunk(
  "Customer/add",
  async (request) => {
    const data = await addCustomerGroup(request);
    return data;
  }
);

export const editCustomerGroupAPI = createAsyncThunk(
  "Customer/edit",
  async (request) => {
    const data = await editCustomerGroup(request);
    return data;
  }
);

export const deleteCustomerGroupAPI = createAsyncThunk(
  "Customer/delete",
  async (id) => {
    const data = await deleteCustomerGroup(id);
    return data;
  }
);

// customer

export const listCustomerAPI = createAsyncThunk(
  "Customer/listCustomer",
  async (request) => {
    const data = await listCustomer(request);
    return data;
  }
);

export const addCustomerAPI = createAsyncThunk(
  "Customer/addCustomer",
  async (request) => {
    const data = await addCustomer(request);
    return data;
  }
);

export const editCustomerAPI = createAsyncThunk(
  "Customer/editCustomer",
  async (request) => {
    const data = await editCustomer(request);
    return data;
  }
);

export const checkActiveApi = createAsyncThunk(
  "Customer/checkActive",
  async (request) => {
    const data = await checkActive(request);
    return data;
  }
);

export const showCustomerApi = createAsyncThunk(
  "Customer/showCustomer",
  async (request) => {
    const data = await showCustomer(request);
    return data;
  }
);

export const sourcesAPI = createAsyncThunk(
  "Customer/sources",
  async (request) => {
    const data = await sources(request);
    return data;
  }
);
export const sourcesAddAPI = createAsyncThunk(
  "Customer/sourcesAdd",
  async (request) => {
    const data = await sourcesAdd(request);
    return data;
  }
);
export const sourcesUpdateAPI = createAsyncThunk(
  "Customer/sourcesUpdate",
  async (request) => {
    const data = await sourcesUpdate(request);
    return data;
  }
);
export const sourcesDeteleAPI = createAsyncThunk(
  "Customer/sourcesDetele",
  async (request) => {
    const data = await sourcesDetele(request);
    return data;
  }
);

export const historyCustomerApi = createAsyncThunk(
  "Customer/historyCustomer",
  async (request) => {
    const data = await historyCustomer(request);
    return data;
  }
);

export const historyCustomerUpdateApi = createAsyncThunk(
  "Customer/historyCustomerUpdate",
  async (request) => {
    const data = await historyCustomerUpdate(request);
    return data;
  }
);

//customer potential

export const listCustomerPotentialAPI = createAsyncThunk(
  "Customer/listCustomerPotential",
  async (request) => {
    const data = await listCustomerPotential(request);
    return data;
  }
);

export const addCustomerPotentialAPI = createAsyncThunk(
  "Customer/addCustomerPotential",
  async (request) => {
    const data = await addCustomerPotential(request);
    return data;
  }
);

export const editCustomerPotentialAPI = createAsyncThunk(
  "Customer/editCustomerPotential",
  async (request) => {
    const data = await editCustomerPotential(request);
    return data;
  }
);

export const deleteCustomerPotentialAPI = createAsyncThunk(
  "Customer/deleteCustomerPotential",
  async (id) => {
    const data = await deleteCustomerPotential(id);
    return data;
  }
);

export const showCustomerPotentialAPI = createAsyncThunk(
  "Customer/showCustomerPotential",
  async (request) => {
    const data = await showCustomerPotential(request);
    return data;
  }
);

export const potentialCustomerToCustomerAPI = createAsyncThunk(
  "Customer/potentialCustomerToCustomer",
  async (request) => {
    const data = await potentialCustomerToCustomer(request);
    return data;
  }
);

//status

export const listStatusAPI = createAsyncThunk(
  "Customer/listStatus",
  async (request) => {
    const data = await listStatus(request);
    return data;
  }
);

export const addStatusAPI = createAsyncThunk(
  "Customer/addStatus",
  async (request) => {
    const data = await addStatus(request);
    return data;
  }
);

export const editStatusAPI = createAsyncThunk(
  "Customer/editStatus",
  async (request) => {
    const data = await editStatus(request);
    return data;
  }
);

export const deleteStatusAPI = createAsyncThunk(
  "Customer/deleteStatus",
  async (id) => {
    const data = await deleteStatus(id);
    return data;
  }
);

export const customerSlice = createSlice({
  name: "Customer",
  initialState: {
    dataCustomerGroup: {},
    dataCustomer: {},
    dataShowCustomer: {},
    datasources: {},
    dataTableSrc: [],
    dataHistoryCustomer: {},
    dataCustomerPotential: {},
    dataShowCusPotential: {},
    dataStatus: {},
    dataStatusSelect: {},
    dataCustomerGroupTable: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listCustomerGroupAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        // state.dataCustomerGroup = action.payload.data;
        const data = action.payload.data;
        const dataCustomerGroup = [];
        data.map((item) => {
          dataCustomerGroup.push({
            value: item.id,
            label: item.name,
          });
        });
        state.dataCustomerGroup = dataCustomerGroup;
        state.dataCustomerGroupTable = data;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(addCustomerGroupAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
        listCustomerGroupAPI();
      } else {
        toast.error("Thêm thất bại: " + action.payload.message);
      }
    });
    builder.addCase(editCustomerGroupAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
      } else {
        toast.error("Sửa thất bại: " + action.payload.message);
      }
    });
    builder.addCase(deleteCustomerGroupAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
        listCustomerGroupAPI();
      } else {
        toast.error("Xóa thất bại: " + action.payload.message);
      }
    });
    //customer
    builder.addCase(listCustomerAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataCustomer = action.payload.data;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(addCustomerAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
        listCustomerAPI();
        setTimeout(() => {
          historyCustomerApi();
        }, 500);
      } else {
        toast.error("Thêm thất bại: " + action.payload.message);
      }
    });
    builder.addCase(editCustomerAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);

        listCustomerAPI();
      } else {
        toast.error("Sửa thất bại: " + action.payload.message);
      }
    });
    builder.addCase(checkActiveApi.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
        listCustomerAPI();
      } else {
        toast.error("Dữ liệu cập nhật thất bại: " + action.payload.message);
      }
    });
    builder.addCase(showCustomerApi.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataShowCustomer = action.payload.data;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(sourcesAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataTableSrc = action.payload.data;
        const data = action.payload.data;
        const dataSources = [];
        data.map((item) => {
          dataSources.push({
            value: item.id,
            label: item.name,
          });
        });
        state.datasources = dataSources;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(sourcesDeteleAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(sourcesUpdateAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(sourcesAddAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(historyCustomerApi.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataHistoryCustomer = action.payload.data;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(historyCustomerUpdateApi.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    //customer potential
    builder.addCase(listCustomerPotentialAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataCustomerPotential = action.payload.data;
        // let dataCustomerPotential = [];
        // let data = action.payload.data;
        // data.map((item) => {
        //   dataCustomerPotential.push({
        //     id: item.id,
        //     name: item.name,
        //     phone: item.phone,
        //     email: item.email,
        //     company: item.company,
        //     src:
        //       "<div className='px-3 py-1 text-orange-600 border border-orange-600 bg-orange-50 rounded'>" +
        //       item.source.name +
        //       "<div>",
        //     description: item.description,
        //     website: item.website,
        //     status:
        //       "<div className='p-2 py-1 text-gray-600 border border-gray-600 bg-gray-50 rounded text-sm'>" +
        //       item.status_name +
        //       "<div>",
        //   });
        // });
        // state.dataCustomerPotential = dataCustomerPotential;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(addCustomerPotentialAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
        // listCustomerGroupAPI();
      } else {
        toast.error("Thêm thất bại: " + action.payload.message);
      }
    });

    builder.addCase(
      potentialCustomerToCustomerAPI.fulfilled,
      (state, action) => {
        if (action?.payload?.result) {
          toast.success(action.payload.message);
        } else {
          toast.error("Thêm thất bại: " + action.payload.message);
        }
      }
    );

    builder.addCase(editCustomerPotentialAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
      } else {
        toast.error("Sửa thất bại: " + action.payload.message);
      }
    });
    builder.addCase(deleteCustomerPotentialAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
        listCustomerGroupAPI();
      } else {
        toast.error("Xóa thất bại: " + action.payload.message);
      }
    });
    builder.addCase(showCustomerPotentialAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataShowCusPotential = action.payload.data;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    //status
    builder.addCase(listStatusAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataStatus = action.payload.data;
        let data = action.payload.data;
        let dataStatusSelect = [];
        data.map((item) => {
          dataStatusSelect.push({
            value: item.id,
            label: item.name,
          });
        });
        state.dataStatusSelect = dataStatusSelect;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(addStatusAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
        listCustomerGroupAPI();
      } else {
        toast.error("Thêm thất bại: " + action.payload.message);
      }
    });
    builder.addCase(editStatusAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
      } else {
        toast.error("Sửa thất bại: " + action.payload.message);
      }
    });
    builder.addCase(deleteStatusAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
        listCustomerGroupAPI();
      } else {
        toast.error("Xóa thất bại: " + action.payload.message);
      }
    });
  },
});
export const data = (state) => state.Customer.dataCustomerGroup;
export const dataCustomer = (state) => state.Customer.dataCustomer;
export const dataShowCustomer = (state) => state.Customer.dataShowCustomer;
export const datasources = (state) => state.Customer.datasources;
export const dataHistoryCustomer = (state) =>
  state.Customer.dataHistoryCustomer;
export const dataCustomerPotential = (state) =>
  state.Customer.dataCustomerPotential;
export const dataStatus = (state) => state.Customer.dataStatus;
export const dataShowCusPotential = (state) =>
  state.Customer.dataShowCusPotential;
export const dataCustomerGroupTable = (state) =>
  state.Customer.dataCustomerGroupTable;
export const dataStatusSelect = (state) => state.Customer.dataStatusSelect;
export const dataTableSrc = (state) => state.Customer.dataTableSrc;
export default customerSlice.reducer;
