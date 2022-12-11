import * as React from "react"
// import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { Formik, Field, Form } from "formik"
import { toast } from "react-toastify"
import { userService } from "../../services/userService"
import { setUser } from "../../store/user/user.action"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
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

  const onLogin = async (cred) => {
    try {
      const user = await userService.login(cred)
      if (!user) return
      dispatch(setUser(user))
      navigate("/")
      toast.success("Logged in Successfully!")
    } catch (error) {
      toast.error("Wrong email or password")
    }
  }

  const onValidate = ({ email, password }) => {
    const errors = {}
    if (!email) errors.email = "Missing email input"
    if (!password || password.length < 6)
      errors.password = "Passwords must be at least six characters."

    return errors
  }

  const onLinkSelect = (path) => {
    navigate(path)
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
              Log Into My Account
            </Typography>
            <Formik
              validateOnChange
              validate={onValidate}
              initialValues={credentials}
              onSubmit={onLogin}
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
                    Log In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link
                        onClick={() => onLinkSelect("/password-recovery")}
                        variant="body2"
                        color="#9b9b9b"
                      >
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link  onClick={() => onLinkSelect("/signup")} variant="body2" color="#9b9b9b">
                        {"Don't have an account?"}
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
