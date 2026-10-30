import { NextRequest, NextResponse } from 'next/server';
import { loginOrRegisterEmailAccount } from '@/lib/serverStore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body.email ? body.email.trim().toLowerCase() : '';
    const password = body.password;
    const name = body.name || email.split('@')[0];
    const isRegister = !!body.isRegister;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Địa chỉ email không hợp lệ.' },
        { status: 400 }
      );
    }

    if (isRegister && (!password || password.length < 6)) {
      return NextResponse.json(
        { success: false, message: 'Mật khẩu phải có ít nhất 6 ký tự.' },
        { status: 400 }
      );
    }

    const { user, accountData, isNewUser } = loginOrRegisterEmailAccount({
      email,
      name,
      password,
      isRegister
    });

    const hasCompletedOnboarding = !!(accountData.profile && accountData.profile.hasCompletedOnboarding);

    return NextResponse.json({
      success: true,
      message: isRegister ? 'Đăng ký tài khoản thành công!' : 'Đăng nhập thành công!',
      user,
      accountData,
      isNewUser,
      hasCompletedOnboarding
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Xác thực tài khoản thất bại.', error: String(error) },
      { status: 500 }
    );
  }
}
