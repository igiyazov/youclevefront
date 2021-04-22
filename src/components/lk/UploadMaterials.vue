<template>
  <div id="app">
    <file-pond style="min-width:280px;"
        labelIdle= "Выбрерите или перенесите файлы"
        type="file" 
        class="filepond"
        name="filepond" 
        multiple 
        allowReorder="true"
        data-max-file-size="3GB"
        allowImagePreview="false"
        allowMultiple="true"
      
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
  name: "UploadMaterials",
  data(){
    return { myFiles: [] }
  },
  methods: {
    removeFile(){
      this.$refs.pond.removeFiles()
    },
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