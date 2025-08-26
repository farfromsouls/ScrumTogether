import os
import asyncio
import logging

from aiogram import Bot, Dispatcher
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO)
token = os.environ.get('API_KEY')
bot = Bot(token)
dp = Dispatcher()


@dp.message(Command("start"))
async def cmd_start(message: types.Message):
    await message.answer("")


async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
