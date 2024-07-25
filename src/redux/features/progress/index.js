import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  progressView: false,
  progressTab: "upload",

  uploadCampaignFileProgress: {},
  uploadCampaignFileStatus: false,

  mergingSampleFilesProgress: {},
  mergingSampleFilesStatus: false,
  
  // createCampaignFileProgress: {},
  // createCampaignFileStatus: false,

  downloadCampaignFileProgress: 0,
  downloadCampaignFileStatus: false,

  downloadDocumentCampaignFileProgress: 0,
  downloadDocumentCampaignFileStatus: false,

  singlePdfCampaignFileProgress: 0,
  singlePdfCampaignFileStatus: false,

  samplePdfCampaignFilesProgress: 0,
  samplePdfCampaignFilesStatus: false,

  createDocumentsCampaignFilesProgress: 0,
  createDocumentsCampaignFilesStatus: false,
};

const progressSlice = createSlice({
  name: "loaders",
  initialState: initialState,
  reducers: {
    setProgress(state, action) {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },

    setCampaignProgress(state, action) {
      state.uploadCampaignFileProgress[action.payload.campaignName] =
        action.payload;
    },

    removeCampaignProgress(state, action) {
      delete state.uploadCampaignFileProgress[action.payload.campaignName];
    },
  },
});

export const { setProgress, setCampaignProgress, removeCampaignProgress } =
  progressSlice.actions;
export default progressSlice.reducer;
