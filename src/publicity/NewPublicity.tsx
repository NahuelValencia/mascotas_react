import React, { useState } from "react"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { goHome } from "../common/utils/Tools"
import "../styles.css"
import { newPromotion, updatePromotionPicture, getImageUrl } from "./publicityService"
import DangerLabel from "../common/components/DangerLabel"
import FormInput from "../common/components/FormInput"
import FormButtonBar from "../common/components/FormButtonBar"
import FormAcceptButton from "../common/components/FormAcceptButton"
import FormButton from "../common/components/FormButton"
import FormTitle from "../common/components/FormTitle"
import Form from "../common/components/Form"
import GlobalContent from "../common/components/GlobalContent"
import { RouteComponentProps } from "react-router-dom"
import ImageUpload from "../common/components/ImageUpload"
import ErrorLabel from "../common/components/ErrorLabel"

export default function NewPublicity(props: RouteComponentProps<{ id: string }>) {
    const [publicityId, setPublicityId] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [redirectLink, setRedirectLink] = useState("")
    const [imageId, setImageId] = useState("")

    const errorHandler = useErrorHandler()

    const saveClick = async () => {
        errorHandler.cleanRestValidations()

        if (!title) {
            errorHandler.addError("name", "No puede estar vacío")
        }

        if (!description) {
            errorHandler.addError("description", "No puede estar vacía")
        }

        if (!redirectLink) {
            errorHandler.addError("redirectLink", "No puede estar vacía")
        }

        if (!imageId) {
            errorHandler.addError("imageId", "No puede estar vacía")
        }

        if (errorHandler.hasErrors()) {
            return
        }

        try {
            await newPromotion({ id: publicityId, title, description, redirectLink, imageId })
            props.history.push("/promotions")
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const uploadPicture = async (image: string) => {
        try {
            const result = await updatePromotionPicture({ image, })
            setImageId(result.id)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    return (
        <GlobalContent>
            <FormTitle>Nueva Publicidad</FormTitle>

            <Form>
                <FormInput
                    label="Titulo"
                    name="title"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                    errorHandler={errorHandler} />

                <FormInput
                    label="Descripción"
                    name="description"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                    errorHandler={errorHandler} />

                <div className="form-group">
                    <label>Banner Image</label>
                    <ImageUpload src={getImageUrl(imageId)}
                        onChange={uploadPicture} />
                    <ErrorLabel message={errorHandler.getErrorText("name")} />
                </div>

                <FormInput
                    label="Url al que redirige"
                    name="redirectLink"
                    value={redirectLink}
                    onChange={event => setRedirectLink(event.target.value)}
                    errorHandler={errorHandler} />

                <DangerLabel message={errorHandler.errorMessage} />

                <FormButtonBar>
                    <FormAcceptButton label="Guardar" onClick={saveClick} />

                    <FormButton label="Cancelar" onClick={() => goHome(props)} />

                </FormButtonBar>
            </Form >
        </GlobalContent>
    )
}
