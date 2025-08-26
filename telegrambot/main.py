import os
import asyncio
import logging

from aiogram import Bot, Dispatcher

from .secret import TOKEN


logging.basicConfig(level=logging.INFO)
bot = Bot(token)
dp = Dispatcher()


@dp.message(Command("start"))
async def cmd_start(message: types.Message):
    await message.answer("")


async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
