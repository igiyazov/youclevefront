<template>
<div id="app">
    <file-pond style="min-width:230px!important;" labelIdle="Выбрать фото" ref="pond" required=true type="file" class="filepond" name="filepond" accept="image/png, image/jpeg, image/jpg" maxFileSize="3MB" imageResizeTargetWidth=100 imageResizeTargetHeight=100 styleLoadIndicatorPosition='center bottom' styleButtonRemoveItemPosition='center bottom' :server="server" v-on:init="handleFilePondInit" :files="myFiles" />
</div>
</template>

<script>
import vueFilePond from "vue-filepond"
import "filepond/dist/filepond.min.css"
import 'filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css'
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
import FilePondPluginFilePoster from 'filepond-plugin-file-poster'
import FilePondPluginFileMetadata from 'filepond-plugin-file-metadata'

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
    FilePondPluginFilePoster,
    FilePondPluginFileMetadata
)

export default {
    name: "UploadPoster",
    props: ['course'],
    data() {
        return {
            // filepond:FilePond,
            id: '',
            myFiles: [],
            server: {
                url: `${this.$store.getters.getServerUrl}/api`,
                process: {
                    url: '/tmp/create',
                    method: 'POST',
                    onload: (response) => {
                        this.$parent.loadPosterId(response)
                        this.id = response
                        return response;
                    },
                    onerror: (response) => response.data,
                    ondata: (formData) => {
                        return formData;
                    }
                },
                revert: {
                    url: '/tmp/delete',
                    method: 'DELETE',
                    header: {
                        'content-type': 'application/json',
                    },
                    ondata: (formData) => {
                        formData.append('id', this.id)
                        return formData;
                    }
                },
                load: (source, load) => {
                    let newSource = new Request(source);
                    fetch(newSource, {
                            cache: 'no-cache'
                        })
                        .then(response => response.blob())
                        .then(blob => {
                            load(blob);
                        })
                },

            },
        }
    },
    async created() {
        this.$root.$refs.UploadPoster = this
    },
    methods: {
        removeFile() {
            this.$refs.pond.removeFiles()
        },
        handleFilePondInit() {},
    },
    components: {
        FilePond,
    },
}
</script>
