import * as React from "react"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { Formik, Field, Form } from "formik"
import { userService } from '../services/userService'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router"
import { toast } from 'react-toastify'

export const ResetPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [credentials, setCredentials] = React.useState({ email: "" })

  const theme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFamily: "Oswald",
            backgroundColor: "whitesmoke",
            lineHeight: "unset",
            letterSpacing: 0,
          },
        },
      },
    },
  })

  const Copyright = (props) => {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit">CollabEdge</Link> {new Date().getFullYear()}
        {"."}
      </Typography>
    )
  }

  const onResetPassword = async ({ email }) => {
    try {
        console.log(email)
      await userService.resetPassword(email)
      // console.log(user)
      // if (!user) return
      // dispatch(setUser(user))
      // navigate("/")
    
    } catch (error) {
      toast.error("Wrong email or password")
    }
  }

  const onValidate = ({ email }) => {
    const errors = {}
    if (!email) errors.email = "Missing email input"
    return errors
  }

  return (
    <div className="main-sign-in-container">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar> */}
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontWeight: 700, fontSize: "2.375rem" }}
            >
              Reset My Password
            </Typography>
            <Formik
              validateOnChange
              validate={onValidate}
              initialValues={credentials}
              onSubmit={onResetPassword}
            >
              {({ errors }) => (
                <Form>
                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    placeholder="Email"
                    name="email"
                    autoFocus
                    sx={{ backgroundColor: "#eee" }}
                  />
                  {<span className="error">{errors.email}</span>}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: "#FCAF45",
                      fontSize: "1rem",
                      fontFamily: "sans-serif",
                      height: "50px",
                      textTransform: "capitalize",
                      fontWeight: "600",
                    }}
                  >
                    Send Reset Link
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link href="/login" variant="body2" color="#9b9b9b">
                        {"Return to login"}
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  )
}
