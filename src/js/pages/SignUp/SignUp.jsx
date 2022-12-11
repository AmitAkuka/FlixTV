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
import { userService } from "../../services/userService"
import { setUser } from "../../store/user/user.action"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"

export const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
    displayName: "",
  })

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

  const onSignup = async (cred) => {
    try {
      const user = await userService.signup(cred)
      if (!user) return
      dispatch(setUser(user))
      toast.success("Signed up Successfully!")
      navigate("/")
    } catch (error) {
      toast.error(error.response.data.err)
    }
  }

  const onValidate = ({ email, password, displayName }) => {
    const errors = {}

    // if (!username) errors.username = "Required"
    if (!email) errors.email = "Required"
    if (!password) errors.password = "Required"
    if (!displayName) errors.displayName = "Required"

    return errors
  }

  const onLinkSelect = (path) => {
    navigate(path)
  } 

  return (
    <div className="main-sign-up-container">
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "475px",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontWeight: 700, fontSize: "38px" }}
            >
              Signup My Account
            </Typography>
            <Formik
              validateOnChange
              validate={onValidate}
              initialValues={credentials}
              onSubmit={onSignup}
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
                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    placeholder="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    sx={{ backgroundColor: "#eee" }}
                  />
                  {<span className="error">{errors.password}</span>}
                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    placeholder="Display Name"
                    name="displayName"
                    autoFocus
                    sx={{ backgroundColor: "#eee" }}
                  />
                  {<span className="error">{errors.displayName}</span>}
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
                    Create account
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link onClick={() => onLinkSelect("/login")} variant="body2" color="#666">
                        {"Have an account?"}
                      </Link>
                    </Grid>
                  </Grid>
                  {/* </Box> */}
                </Form>
              )}
            </Formik>
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
      </ThemeProvider>
    </div>
  )
}
