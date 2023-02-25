import FullLayout from "@/src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/src/theme/theme";
import {
  Grid,
  Stack,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  Button,
} from "@mui/material";
import BaseCard from "@/src/components/baseCard/BaseCard";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Add = () => {

  const [form, setForm] = useState({
    title: "",
    slug: "",
    type: "",
    size: "",
    color: "",
    description: ""
  })


  const handleChange = (e) => {
    const name = e.target
    const value = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const submitForm = (e) => {
    e.preventDefault()

    let response = fetch(`${process.env.NEXT_PUBLIC_HOST}/api/`)

    if (response.success == true) {
      toast.success("Product added Successfully", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Something went wrong", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
      });
    }


  }

  return (
    <ThemeProvider theme={theme}>
      <style jsx global>{`
    footer{
        display: none
  }`
      } </style>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        pauseOnHover
        theme="light"
      />;
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <BaseCard title="Add Product">
              <Stack spacing={3}>
                <TextField id="title" value={form.title && form.title} onChange={handleChange} name="title" label="Title" placeholder="Title of the product" variant="outlined" />
                <TextField id="slug" value={form.slug && form.slug} onChange={handleChange} name="slug" label="Slug" placeholder="slug of the product" variant="outlined" />
                <TextField id="type" value={form.type && form.type} onChange={handleChange} name="type" label="Type" variant="outlined" />
                <TextField id="size" value={form.size && form.size} onChange={handleChange} name="size" label="Size" placeholder="s, m, l, xl, xxl" variant="outlined" />
                <TextField id="color" value={form.color && form.color} onChange={handleChange} name="color" label="Color" placeholder="red, #fbfbfb, rgb(255, 205, 230)..." variant="outlined" />
                <TextField
                  id="description"
                  label="Description"
                  type="text"
                  value={form.description && form.description}
                  onChange={handleChange}
                  name="description"
                  multiline
                  rows={2}
                  variant="outlined"
                />
                {/*<TextField
                  error
                  id="er-basic"
                  label="Error"
                  defaultValue="ad1avi"
                  variant="outlined"
                />*/}
                {/*<FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Terms & Condition"
                  />
                  <FormControlLabel
                    disabled
                    control={<Checkbox />}
                    label="Disabled"
                  />
              </FormGroup>*/}
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
              <br />
              <Button onClick={submitForm} variant="outlined" mt={2}>
                Submit
              </Button>
            </BaseCard>
          </Grid>

        </Grid>
      </FullLayout>
    </ThemeProvider>
  )
}

export default Add