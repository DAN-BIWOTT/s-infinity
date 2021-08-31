import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// firebase
import { auth,db,signInWithEmailAndPassword } from '../../../firebase.js';
// redux
import { useSelector,useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../states/index';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });
  // Redux data
    const dispatch = useDispatch();
    const  {signinUser}  = bindActionCreators(actionCreators,dispatch);
    // console.log(signinUser);
    
  var user = {uid:"",
  firstName:"",
  lastName:"",
  email:"",
  time:""
};

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      // console.log(formik.values);
      signInWithEmailAndPassword(auth,
        formik.values.email, formik.values.password
        ).then(auth.onAuthStateChanged(userAuth => {
          var profile = {
            lastName: "",
            firstName: "",
            u_id: ""
        }
          const q = query(collection(db,'Users'),where("u_id","==",`${userAuth.uid}`));
          getDocs(q).then(querySnapshot => {
          querySnapshot.forEach(doc => {
                                profile = doc.data();
                            });
          user.uid = userAuth.uid;
          user.email = userAuth.email;
          user.time = Date.now();
          user.firstName = profile.firstName;
          user.lastName = profile.lastName;
          if(userAuth){
            signinUser(user);
            localStorage.setItem("logged_in",JSON.stringify(user));
            navigate('/dashboard/app', { replace: true });
          }
                        }
                );
         
        })).catch(err => {
        console.log(err)
        })
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
