# src/services/api_keeper.py

import hashlib
import requests
import asyncio

class APIKeeper:
    def __init__(self, server_url):
        self.server_url = server_url
        self.api_keys = {}
        self.hash_cache = {}

    async def fetch_api_keys(self):
        response = await asyncio.get_event_loop().run_in_executor(
            None, requests.get, f"{self.server_url}/api_keys"
        )
        if response.status_code == 200:
            self.api_keys = response.json()
            self.update_hash_cache()

    def update_hash_cache(self):
        for key, value in self.api_keys.items():
            self.hash_cache[key] = hashlib.sha256(value.encode()).hexdigest()

    def get_api_key(self, service):
        return self.api_keys.get(service, '')

    def verify_hash(self, service, provided_hash):
        return self.hash_cache.get(service) == provided_hash