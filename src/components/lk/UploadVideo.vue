<template>
<div id="app">
    <file-pond style="min-width:280px;" labelIdle="Выбрерите или перенесите видео" type="file" ref="pond" class="filepond" name="filepond" multiple allowReorder="true" maxFileSize='4000MB' allowImagePreview="false" allowMultiple="true" :server="server" v-on:reorderfiles="handleReorderFiles" v-on:processfiles="handleReorderFiles" v-on:init="handleFilePondInit" :files="files" />
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
    name: "UploadVideo",
    props: ['course'],
    data() {
        return {
            id: [],
            myFiles: [],
            files: [
				// {
                //     options: {
                //         type: 'local',
                //         file: {
                //             name: 'my-file.png',
                //             size: 3001025,
                //             type: 'image/png'
                //         }
                //     }
                // },
                // {
                //     options: {
                //         type: 'local',
                //         file: {
                //             name: 'new-file.png',
                //             size: 3001025,
                //             type: 'image/png'
                //         }
                //     }
                // },

            ],
            server: {
                url: `${this.$store.getters.getServerUrl}/api`,
                process: {
                    url: '/tmp/create',
                    method: 'POST',
                    onload: (response) => {
                        this.$parent.loadVideoId(response)
                        this.id.push(response)
                        return response
                    }
                },
                revert: {
                    url: '/tmp/delete',
                    method: 'DELETE'
                }

            },
            lessonList: [],
            editLessonList: [],
        }
    },
    async created() {
        this.$root.$refs.UploadVideo = this
        if (this.course && Object.entries(this.course).length != 0) {
            this.editLessonList = await this.loadList(`/api/lessons/${this.course.id}`)
            console.log('Work')
            console.log(this.editLessonList)
        }
		this.$root.$refs.videos = this.files
    },
    methods: {
        removeFile() {
            this.$refs.pond.removeFiles()
        },

        handleReorderFiles: function () {

            for (var i = 0; i < this.$refs.pond.getFiles().length; i++) {
                this.lessonList[i] = `${i, this.$refs.pond.getFile(i).serverId}`
            }

            // console.log(this.$refs.pond.getFiles(),this.$refs.pond.getFiles().filename)
        },
        handleFilePondInit() {
            this.$refs.pond.getFiles()
            // FilePond instance methods are available on `this.$refs.pond`
        },
        async loadList(pathUrl) {
            const base = this.$store.getters.getBase
            const axios = this.axios.create(base)
            const listA = await axios
                .get(`${pathUrl}`)
                .then(response => {
                    return response.data
                })
            return listA
        },
		addVideos(){
			for(let i = 0; i < this.editLessonList.length; i++)
			{
				
				this.files.push({
					options:{
						type: 'local',
                        file: {
                            name: this.editLessonList[i].title,
                            // size: 3001025,
                            type: 'image/png'
                        }
					}
				})
				this.editLessonList[i]
			}
		}
    },
	watch:{
		async course(val){
			this.editLessonList = []
			this.files = []
			this.editLessonList = await this.loadList(`/api/lessons/${val.id}`) 
			this.addVideos()
		}
	},
    computed: {
        getCourses() {
			console.log('Work')
            return this.course
        }
    },
    components: {
        FilePond,
    },
}
</script>
