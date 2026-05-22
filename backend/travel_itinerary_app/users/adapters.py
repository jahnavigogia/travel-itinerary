from allauth.socialaccount.adapter import DefaultSocialAccountAdapter


class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):

    def pre_social_login(self, request, sociallogin):
        print("SOCIAL LOGIN DATA:", sociallogin.account.extra_data)

    def save_user(self, request, sociallogin, form=None):
        print("SOCIAL USER DATA:")
        return super().save_user(request, sociallogin, form)