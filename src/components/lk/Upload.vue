<template>
  <div id="app">
    <file-pond style="width:170px!important;height: 170px!important;"
       labelIdle= "Выбрать фото"
       type="file" 
       class="filepond"
       name="filepond"
       accept="image/png, image/jpeg, image/gif"
       imagePreviewHeight= 170
       imageCropAspectRatio= '1:1'
       imageResizeTargetWidth= 200
       imageResizeTargetHeight= 200
       stylePanelLayout= 'compact circle'
       styleLoadIndicatorPosition= 'center bottom'
       styleButtonRemoveItemPosition= 'center bottom'
      
    />
  </div>
</template>

<script>
import vueFilePond from "vue-filepond"
import "filepond/dist/filepond.min.css"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css"

// Import image preview and file type validation plugins
import FilePondPluginFileEncode from "filepond-plugin-file-encode"
import FilePondPluginImageCrop from "filepond-plugin-image-crop"
import FilePondPluginImageResize from "filepond-plugin-image-resize"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size"
import FilePondPluginImageEdit from "filepond-plugin-image-edit"
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginImageEdit,
  FilePondPluginImageExifOrientation,
  FilePondPluginFileEncode,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
)

export default {
  name: "Upload",
  data(){
    return { 
      myFiles: [],
      server:
        {
          url: this.$store.getters.getServerUrl
        } 
      }
  },
  methods: {
    handleFilePondInit() {
      console.log("FilePond has initialized")

      // FilePond instance methods are available on `this.$refs.pond`
    },
  },
  components: {
    FilePond,
  },
}
</script>