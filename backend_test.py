import requests
import sys
import json
from datetime import datetime

class TempleAPITester:
    def __init__(self, base_url="https://doc-driven-web.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.admin_token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        test_headers = {'Content-Type': 'application/json'}
        if headers:
            test_headers.update(headers)
        
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=test_headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=test_headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=test_headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=test_headers, timeout=10)

            print(f"Response Status: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json() if response.text else {}
                    if response_data:
                        print(f"Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    response_data = {}
                return True, response_data
            else:
                error_detail = f"Expected {expected_status}, got {response.status_code}"
                if response.text:
                    try:
                        error_data = response.json()
                        error_detail += f" - {error_data}"
                    except:
                        error_detail += f" - {response.text[:100]}"
                print(f"❌ Failed - {error_detail}")
                self.failed_tests.append({"test": name, "error": error_detail})
                return False, {}

        except requests.exceptions.RequestException as e:
            error_detail = f"Network error: {str(e)}"
            print(f"❌ Failed - {error_detail}")
            self.failed_tests.append({"test": name, "error": error_detail})
            return False, {}
        except Exception as e:
            error_detail = f"Error: {str(e)}"
            print(f"❌ Failed - {error_detail}")
            self.failed_tests.append({"test": name, "error": error_detail})
            return False, {}

    def test_admin_login(self):
        """Test admin login to get token for authenticated endpoints"""
        success, response = self.run_test(
            "Admin Login",
            "POST",
            "auth/admin/login",
            200,
            data={"username": "admin", "password": "admin123"}
        )
        if success and 'token' in response:
            self.admin_token = response['token']
            print(f"Admin token obtained: {self.admin_token[:20]}...")
            return True
        return False

    def test_volunteer_registration(self):
        """Test volunteer registration"""
        volunteer_data = {
            "name": f"Test Volunteer {datetime.now().strftime('%H%M%S')}",
            "mobile": f"99999{datetime.now().strftime('%H%M%S')[:5]}",
            "email": f"test{datetime.now().strftime('%H%M%S')}@test.com",
            "city": "Test City",
            "skills": "Testing, Programming",
            "availability": "Weekends",
            "message": "Test volunteer registration"
        }
        success, response = self.run_test(
            "Volunteer Registration",
            "POST",
            "volunteers",
            200,
            data=volunteer_data
        )
        return success

    def test_newsletter_subscription(self):
        """Test newsletter subscription"""
        email = f"test{datetime.now().strftime('%H%M%S')}@newsletter.com"
        success, response = self.run_test(
            "Newsletter Subscription",
            "POST",
            "newsletter/subscribe",
            200,
            data={"email": email}
        )
        return success

    def test_contact_message(self):
        """Test contact message submission"""
        contact_data = {
            "name": "Test User",
            "email": f"test{datetime.now().strftime('%H%M%S')}@contact.com",
            "mobile": f"98765{datetime.now().strftime('%H%M%S')[:5]}",
            "subject": "Test Contact Message",
            "message": "This is a test contact message from automated testing."
        }
        success, response = self.run_test(
            "Contact Message Submission",
            "POST",
            "contact",
            200,
            data=contact_data
        )
        return success

    def test_visitor_stats(self):
        """Test visitor stats endpoint"""
        success, response = self.run_test(
            "Get Visitor Stats",
            "GET",
            "visitor-stats",
            200
        )
        if success and response:
            if 'total_visitors' in response and 'todays_visitors' in response:
                print(f"Visitor stats: Total={response.get('total_visitors')}, Today={response.get('todays_visitors')}")
                return True
        return success

    def test_live_streams(self):
        """Test live streams endpoint"""
        success, response = self.run_test(
            "Get Live Streams",
            "GET",
            "live-streams",
            200
        )
        if success and isinstance(response, list):
            print(f"Found {len(response)} live streams")
            for stream in response[:2]:  # Show first 2 streams
                print(f"  - {stream.get('name', 'Unknown')}: {stream.get('description', 'No description')}")
        return success

    def test_gallery_videos(self):
        """Test gallery videos endpoint"""
        success, response = self.run_test(
            "Get Gallery Videos",
            "GET",
            "gallery?media_type=VIDEO",
            200
        )
        if success and isinstance(response, list):
            print(f"Found {len(response)} videos in gallery")
            for video in response[:2]:  # Show first 2 videos
                print(f"  - {video.get('title', 'Unknown')}: {video.get('category', 'No category')}")
        return success

    def test_news_endpoint(self):
        """Test news endpoint"""
        success, response = self.run_test(
            "Get News",
            "GET",
            "news",
            200
        )
        if success and isinstance(response, list):
            print(f"Found {len(response)} news items")
        return success

    def test_sevas_endpoint(self):
        """Test sevas endpoint"""
        success, response = self.run_test(
            "Get Sevas",
            "GET",
            "sevas",
            200
        )
        if success and isinstance(response, list):
            print(f"Found {len(response)} sevas available")
        return success

    def test_root_endpoint(self):
        """Test API root endpoint"""
        success, response = self.run_test(
            "API Root",
            "GET",
            "",
            200
        )
        return success

def main():
    print("=" * 60)
    print("🏛️  TEMPLE WEB APPLICATION - BACKEND API TESTING")
    print("=" * 60)
    
    tester = TempleAPITester()
    
    # Test sequence
    tests_to_run = [
        ("API Root", tester.test_root_endpoint),
        ("Admin Login", tester.test_admin_login),
        ("Visitor Stats", tester.test_visitor_stats),
        ("Live Streams", tester.test_live_streams),
        ("Gallery Videos", tester.test_gallery_videos),
        ("News Endpoint", tester.test_news_endpoint),
        ("Sevas Endpoint", tester.test_sevas_endpoint),
        ("Volunteer Registration", tester.test_volunteer_registration),
        ("Newsletter Subscription", tester.test_newsletter_subscription),
        ("Contact Message", tester.test_contact_message),
    ]
    
    print(f"\nRunning {len(tests_to_run)} API tests...")
    
    for test_name, test_func in tests_to_run:
        try:
            test_func()
        except Exception as e:
            print(f"❌ {test_name} failed with exception: {str(e)}")
            tester.failed_tests.append({"test": test_name, "error": str(e)})

    # Print final results
    print("\n" + "=" * 60)
    print("📊 BACKEND TEST RESULTS SUMMARY")
    print("=" * 60)
    print(f"Total Tests: {tester.tests_run}")
    print(f"Passed: {tester.tests_passed}")
    print(f"Failed: {len(tester.failed_tests)}")
    print(f"Success Rate: {(tester.tests_passed/tester.tests_run*100):.1f}%")
    
    if tester.failed_tests:
        print("\n❌ FAILED TESTS:")
        for i, test in enumerate(tester.failed_tests, 1):
            print(f"{i}. {test['test']}: {test['error']}")
    else:
        print("\n✅ All backend tests passed!")
    
    return 0 if not tester.failed_tests else 1

if __name__ == "__main__":
    sys.exit(main())