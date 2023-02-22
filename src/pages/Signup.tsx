/* eslint-disable react/no-unknown-property */
import React, { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useNavigate, useLocation } from 'react-router';
import COLORS from '@/styles/colors';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import BackButton from '@/components/common/BackButton';
import { ROUTES } from '@/constants/routes';
import { ErrStyle, InputBox, LogoStyle } from './Login';
import { Dispatch } from 'react';
import { setModal } from '@/store/modalSlice';

interface FormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  sex: string;
  bank: string;
  loan: string;
  credit: number;
  interest: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const location1 = useLocation();
  const [isBackModalOpen, setIsBackModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, isDirty, dirtyFields, errors },
  } = useForm<FormValues>();
  const [FormData, setFormData] = useState<FormValues>({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    sex: '',
    bank: '',
    loan: '',
    credit: 0,
    interest: '',
  });
  // 비밀번호와 비밀번호 확인이 일치하는지 검증하기 위해 "password" input 의 value 를 추적함
  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch('password');

  useEffect(() => {
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', handleEvent);
    return () => {
      window.removeEventListener('popstate', handleEvent);
    };
  }, []);

  const onSubmit = (data: FormValues) => {
    setFormData(data);
    setIsSubmitModalOpen(true);
  };

  const validateSelectOption = (value: string) => {
    return value === '' ? 'Please select an option' : true;
  };

  const modalSubmitHandler = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    alert(JSON.stringify(FormData));
    goWelcome();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const handleEvent = () => {
    history.pushState(null, '', location.href);
    setIsBackModalOpen(true);
  };

  const goBack = () => {
    navigate(location1.state?.from || '/', { replace: true });
  };

  const goWelcome = () => {
    navigate(ROUTES.WELCOME, { state: ROUTES.SIGNUP });
  };

  return (
    <SignForm>
      <BackButton onClick={() => setIsBackModalOpen(true)} size={25} />
      <SignupStyle>
        <h1 css={mb30}>
          <LogoStyle src="../../images/logo_Main.png" alt="" />
        </h1>
        <SignupFormStyle onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
          <SignupFormPanel>
            <InputBox className={errors.email ? 'active' : dirtyFields.email ? 'active' : ''}>
              <Input
                id="SignupEmail"
                label="Email"
                inputType="text"
                classType="text-input-white"
                aria-invalid={!isDirty ? undefined : errors.email ? 'true' : 'false'}
                register={{
                  ...register('email', {
                    required: '이메일을 입력해주세요.',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: '이메일 형식을 올바르게 작성해주세요.',
                    },
                  }),
                }}
              />
              {errors.email && <ErrStyle role="alert">{errors.email.message}</ErrStyle>}
            </InputBox>
            <InputBox className={errors.password ? 'active' : dirtyFields.password ? 'active' : ''}>
              <Input
                id="SignupPw"
                label="Password"
                inputType="password"
                classType="text-input-white"
                aria-invalid={!isDirty ? undefined : errors.password ? 'true' : 'false'}
                register={{
                  ...register('password', {
                    required: '비밀번호를 입력해주세요.',
                    minLength: { value: 8, message: '비밀번호를 8자리 이상 입력해주세요.' },
                  }),
                }}
              />
              {errors.password && <ErrStyle role="alert">{errors.password.message}</ErrStyle>}
            </InputBox>

            <InputBox
              className={
                errors.passwordConfirm ? 'active' : dirtyFields.passwordConfirm ? 'active' : ''
              }
            >
              <Input
                id="SignupPwConfirm"
                label="Password Confirm"
                inputType="password"
                classType="text-input-white"
                aria-invalid={!isDirty ? undefined : errors.passwordConfirm ? 'true' : 'false'}
                register={{
                  ...register('passwordConfirm', {
                    required: true,
                    validate: (value) => value === passwordRef.current,
                  }),
                }}
              />
              {errors.passwordConfirm && errors.passwordConfirm.type === 'validate' && (
                <ErrStyle role="alert">비밀번호가 일치하지 않습니다.</ErrStyle>
              )}
            </InputBox>

            <InputBox className={errors.name ? 'active' : dirtyFields.name ? 'active' : ''}>
              <Input
                id="SignupName"
                label="Name"
                inputType="text"
                classType="text-input-white"
                aria-invalid={!isDirty ? undefined : errors.name ? 'true' : 'false'}
                register={{
                  ...register('name', {
                    required: '이름을 입력해주세요.',
                    pattern: {
                      value: /^[가-힣]{2,4}$/,
                      message: '이름을 한글로 올바르게 작성해주세요.',
                    },
                  }),
                }}
              />
              {errors.name && <ErrStyle role="alert">{errors.name.message}</ErrStyle>}
            </InputBox>

            {/* <Input
              inputType="number"
              classType="text-input-white"
              placeholder="나이"
              aria-invalid={!isDirty ? undefined : errors.age ? 'true' : 'false'}
              register={{
                ...register('age', {
                  required: '나이를 입력해주세요.',
                  pattern: {
                    value: /^(0|[1-9]|[1-9][0-9])$/,
                    message: '나이는 0 이상 100 미만의 숫자로 입력해주세요.',
                  },
                }),
              }}
            />
            {errors.age && (
              <small css={ErrStyle} role="alert">
                {errors.age.message}
              </small>
            )} */}

            <InputBox
              css={BirthStyle}
              className={
                errors.birthYear || errors.birthDay || errors.birthMonth
                  ? 'active'
                  : dirtyFields.birthYear || dirtyFields.birthDay || dirtyFields.birthMonth
                  ? 'active'
                  : ''
              }
            >
              <SelectLabel>Birth</SelectLabel>
              <SelectStyle
                {...register('birthYear', {
                  required: '생년월일을 선택해주세요.',
                })}
              >
                <option value="">연도</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </SelectStyle>
              <SelectStyle {...register('birthMonth')}>
                <option value="">월</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </SelectStyle>
              <SelectStyle {...register('birthDay')}>
                <option value="">일</option>
                <option value="1">1</option>
                <option value="">2</option>
              </SelectStyle>
              {(errors.birthYear || errors.birthDay || errors.birthMonth) && (
                <ErrStyle role="alert">{errors.birthYear!.message}</ErrStyle>
              )}
            </InputBox>

            <InputBox className={errors.credit ? 'active' : dirtyFields.credit ? 'active' : ''}>
              <Input
                id="SignupCreditScore"
                label="Personality Credit Score"
                inputType="number"
                classType="text-input-white"
                aria-invalid={!isDirty ? undefined : errors.credit ? 'true' : 'false'}
                register={{
                  ...register('credit', {
                    required: '개인신용점수를 입력해주세요.',
                    pattern: {
                      value: /^(0|[1-9]|[1-9][0-9]|[1-9][1-9][1-9])$/,
                      message: '신용점수는 0 이상 999 미만의 숫자로 입력해주세요.',
                    },
                  }),
                }}
              />
              {errors.credit && <ErrStyle role="alert">{errors.credit.message}</ErrStyle>}
            </InputBox>

            <InputBox className={errors.sex ? 'active' : dirtyFields.sex ? 'active' : ''}>
              <SelectLabel>Gender</SelectLabel>
              <SelectStyle
                {...register('sex', {
                  required: '성별을 선택해주세요.',
                  validate: validateSelectOption,
                })}
              >
                <option value="">성별</option>
                <option value="male">남성</option>
                <option value="female">여성</option>
              </SelectStyle>
              {errors.sex && <ErrStyle role="alert">{errors.sex.message}</ErrStyle>}
            </InputBox>

            <InputBox className={errors.bank ? 'active' : dirtyFields.bank ? 'active' : ''}>
              <SelectLabel>Bank</SelectLabel>
              <SelectStyle
                {...register('bank', {
                  required: '은행을 선택해주세요.',
                  validate: validateSelectOption,
                })}
              >
                <option value="">선호 은행</option>
                <option value="bank1">공무원</option>
                <option value="bank2">개인사업자</option>
                <option value="bank3">무직</option>
              </SelectStyle>
              {errors.bank && <ErrStyle role="alert">{errors.bank.message}</ErrStyle>}
            </InputBox>

            <InputBox className={errors.loan ? 'active' : dirtyFields.loan ? 'active' : ''}>
              <SelectLabel>Type of Loan</SelectLabel>
              <SelectStyle
                {...register('loan', {
                  required: '선호하는 대출 종류를 선택해주세요.',
                  validate: validateSelectOption,
                })}
              >
                <option value="">선호 대출 종류</option>
                <option value="">중장기 신용 대출</option>
                <option value="">단기 신용 대출</option>
                <option value="">소액 신용 대출</option>
              </SelectStyle>
              {errors.loan && <ErrStyle role="alert">{errors.loan.message}</ErrStyle>}
            </InputBox>

            <InputBox className={errors.interest ? 'active' : dirtyFields.interest ? 'active' : ''}>
              <SelectLabel>Type of Rate</SelectLabel>
              <SelectStyle
                {...register('interest', {
                  required: '선호하는 금리 종류를 선택해주세요.',
                  validate: validateSelectOption,
                })}
              >
                <option value="">선호 금리 종류</option>
                <option value="interest1">고정 금리</option>
                <option value="interest2">변동 금리</option>
              </SelectStyle>
              {errors.interest && <ErrStyle role="alert">{errors.interest.message}</ErrStyle>}
            </InputBox>
          </SignupFormPanel>
          <Button type="submit" isDisabled={isSubmitting} height="50px" width="calc(100% - 140px)">
            Submit
          </Button>
        </SignupFormStyle>
      </SignupStyle>
    </SignForm>
  );
};

Modal.setAppElement('#root');

export default Signup;

export const SignForm = styled.div`
  background-color: ${COLORS.textInput};
  height: calc(100% + 115px);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignupStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  #lottie {
    width: 100px;
  }
`;

const SelectStyle = styled.select`
  background-color: ${COLORS.white};
  display: flex;
  align-items: center;
  width: 100%;
  border: none;
  padding: 10px 15px;
  outline: none;
  cursor: pointer;

  option {
    background-color: white;
  }
`;

export const SignupFormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignupFormPanel = styled.div`
  width: 100%;
  padding: 20px 70px;
  margin-bottom: 30px;
  min-height: 300px;
  max-height: 500px;
  overflow-y: auto;
`;

const mb30 = css`
  margin-bottom: 30px;
  padding: 0 70px;
`;

const BirthStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SelectLabel = styled.label`
  position: absolute;
  font-size: 13px;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: ${COLORS.gray};
  cursor: pointer;
  transition: 0.5s;
  opacity: 0;
  z-index: -1;
`;
